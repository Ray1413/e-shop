import React from "react";
import { Outlet, useLoaderData, type ShouldRevalidateFunctionArgs } from "react-router";
import type { Route } from "./+types/_app-layout.supermarket";
import { CategoryBreadcrumb, CategoryPanel, ProductArea } from "@/components/product";
import {
  categoryTreeLoader,
  shouldCategoryTreeLoaderRevalidate,
} from "@/lib/loader/categoryTree.loader";

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
      <ProductArea
        categoryPanel={<CategoryPanel categoryTree={loaderData.categoryTree} />}
        categoryBreadcrumb={<CategoryBreadcrumb categoryTree={loaderData.categoryTree} />}
        productList={<Outlet />}
      />
    </div>
  );
}
