import { matchPath, type ShouldRevalidateFunctionArgs } from "react-router";
import { navItems } from "@/components/header";
import type { CategoryTreeItem } from "@/lib/schema/category.schema";
import { getCategoryTree } from "@/lib/service/category.service";

export async function categoryTreeLoader(request: Request) {
  const pathInfo = matchPath("/:firstSegment/:category?", new URL(request.url).pathname);
  const mainCategoryCode = navItems.find((item) =>
    item.href.startsWith("/" + pathInfo?.params.firstSegment),
  )?.id;
  let categoryTree: CategoryTreeItem[] = [];
  if (mainCategoryCode) {
    categoryTree = await getCategoryTree(mainCategoryCode, pathInfo?.params.category);
  }

  await new Promise((res) => setTimeout(res, 2000));
  return categoryTree;
}

export function shouldCategoryTreeLoaderRevalidate(arg: ShouldRevalidateFunctionArgs) {
  let shouldRevalidate = arg.defaultShouldRevalidate;
  const pathPattern = "/:firstSegment/*";
  const currentPathInfo = matchPath(pathPattern, arg.currentUrl.pathname);
  const nextPathInfo = matchPath(pathPattern, arg.nextUrl.pathname);

  if (currentPathInfo && nextPathInfo) {
    shouldRevalidate = currentPathInfo.params.firstSegment != nextPathInfo.params.firstSegment;
  }

  return shouldRevalidate;
}
