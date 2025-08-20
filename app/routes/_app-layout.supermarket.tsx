import React from "react";
import { Outlet, useLoaderData, type ShouldRevalidateFunctionArgs } from "react-router";
import type { Route } from "./+types/_app-layout.supermarket";
import { ProductArea } from "@/components/product";
import { categoryTreeLoader } from "@/lib/.server/loader/categoryTree.loader";
import { shouldCategoryTreeLoaderRevalidate } from "@/lib/utils/shouldCategoryTreeLoaderRevalidate";

export async function loader({ request }: Route.LoaderArgs) {
  const categoryTree = await categoryTreeLoader(request);
  return {
    categoryTree,
  };
}

export type Loader = typeof loader;

export function shouldRevalidate(arg: ShouldRevalidateFunctionArgs) {
  return shouldCategoryTreeLoaderRevalidate(arg);
}

export default function Supermarket() {
  const loaderData = useLoaderData<Loader>();

  return (
    <div>
      <ProductArea categoryTree={loaderData.categoryTree} productContent={<Outlet />} />
    </div>
  );
}
