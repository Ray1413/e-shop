// https://vite.dev/guide/api-plugin.html
import type { Plugin } from "vite";

import { execSync } from "node:child_process";

const version = process.env.npm_package_version || "0.0.1";

let gitCommitId = "";
try {
  const result = execSync("git rev-parse --short HEAD");
  gitCommitId = result.toString().replace(/(\r\n|\n|\r)/gm, "");
} catch (error) {
  console.log(error);
}

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
(process as any).__date__ = (process as any).__date__ || new Date();
let date = (process as any).__date__;
date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
const dateString = date
  .toISOString()
  .split(".")[0]
  .replaceAll("-", "")
  .replaceAll(":", "")
  .replaceAll("T", "");

const fullVersion = `${version}${gitCommitId && "-" + gitCommitId}-${dateString}`;

export default function fullVersionPlugin(): Plugin {
  const virtualModuleId = "virtual:full-version";
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: "full-version",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const fullVersion = "${fullVersion}"`;
      }
    },
  };
}
