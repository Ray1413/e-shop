import React from "react";
import { redirect } from "react-router";
import { navItems } from "@/components/header";

export async function loader() {
  if (navItems[0]?.href) return redirect(navItems[0]?.href);

  return {};
}

export default function Index() {
  return <div>Index</div>;
}
