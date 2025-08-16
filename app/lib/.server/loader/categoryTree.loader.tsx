import { matchPath } from "react-router";
import { navItems } from "@/components/header";
import type { CategoryTreeItem } from "@/lib/schema/category.schema";
import { getCategoryTree } from "@/lib/.server/service/category.service";

export async function categoryTreeLoader(request: Request) {
  const pathInfo = matchPath("/:firstSegment/:category?", new URL(request.url).pathname);
  const mainCategoryCode = navItems.find((item) =>
    item.href.startsWith("/" + pathInfo?.params.firstSegment),
  )?.id;
  let categoryTree: CategoryTreeItem[] = [];
  if (mainCategoryCode) {
    categoryTree = await getCategoryTree(mainCategoryCode, pathInfo?.params.category);
  }

  // await new Promise((res) => setTimeout(res, 2000));
  return categoryTree;
}
