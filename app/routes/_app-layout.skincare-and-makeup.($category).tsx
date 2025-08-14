import React from "react";
import type { Route } from "./+types/_app-layout.skincare-and-makeup.($category)";
import productListLoader from "@/lib/loader/product-list.loader";
import { ProductList } from "@/components/product";

export async function loader({ request }: Route.LoaderArgs) {
  const productData = await productListLoader(request);
  return {
    ...productData,
  };
}

export type Loader = typeof loader;

export default function SkincareAndMakeupCategory({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <ProductList pagination={loaderData.pagination} list={loaderData.list} />
    </div>
  );
}
