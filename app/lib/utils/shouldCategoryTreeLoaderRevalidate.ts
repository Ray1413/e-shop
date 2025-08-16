import { matchPath, type ShouldRevalidateFunctionArgs } from "react-router";

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
