import React from "react";
import type { Route } from "./+types/_app-layout.supermarket.($category)";

export default function Category({ params }: Route.ComponentProps) {
  return <>Category:{params.category}</>;
}
