import React from "react";
import { Outlet, useLoaderData, type ShouldRevalidateFunctionArgs } from "react-router";
import type { Route } from "./+types/_app-layout.housewares";
import { CategoryPanel, ProductArea } from "@/components/product";
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

export default function Housewares() {
  const loaderData = useLoaderData<Loader>();

  return (
    <div>
      <ProductArea
        categoryPanel={<CategoryPanel categoryTree={loaderData.categoryTree} />}
        productList={<Outlet />}
      />
    </div>
  );
}
