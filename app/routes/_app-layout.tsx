import React from "react";
import { Outlet } from "react-router";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fullVersion } from "virtual:full-version";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer fullVersion={fullVersion} />
    </div>
  );
}
