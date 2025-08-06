import React from "react";
import type { Route } from "../+types/root";
import { Outlet } from "react-router";
import Header from "@/components/header";
import { matchPath } from "react-router";
import { navItems } from "@/components/header";
import type { CategoryTreeItem } from "@/lib/schema/category.schema";
import { getCategoryTree } from "@/lib/service/category.service";
import { ProductArea } from "@/components/product";

export async function loader({ request, params }: Route.LoaderArgs) {
  const pathInfo = matchPath("/:firstSegment/:category?", new URL(request.url).pathname);
  // console.log(pathInfo);
  const mainCategoryCode = navItems.find((item) =>
    item.href.startsWith("/" + pathInfo?.params.firstSegment),
  )?.id;
  let categoryTree: CategoryTreeItem[] = [];
  if (mainCategoryCode) {
    categoryTree = await getCategoryTree(mainCategoryCode, pathInfo?.params.category);
  }
  // console.log(categoryTree);

  await new Promise((res) => setTimeout(res, 2000));
  return {
    categoryTree,
  };
}

export type Loader = typeof loader;

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <ProductArea />
    </div>
  );
}
