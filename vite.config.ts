import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";
import path from "node:path";
import fullVersionPlugin from "./vite-plugins/vite-plugin-full-version";

export default defineConfig({
  optimizeDeps: {
    include: [
      "@tanem/react-nprogress",
      "@generated-prisma/client",
      "embla-carousel-autoplay",
      "embla-carousel-react",
      "lucide-react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      ...fs.readdirSync("node_modules/@radix-ui").map((dirname) => path.join("@radix-ui", dirname)),
    ],
  },

  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), fullVersionPlugin()],
});
