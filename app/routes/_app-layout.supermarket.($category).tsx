import React from "react";
import type { Route } from "./+types/_app-layout.supermarket.($category)";
import productListLoader from "@/lib/.server/loader/product-list.loader";
import { ProductList } from "@/components/product";

export async function loader({ request }: Route.LoaderArgs) {
  const productData = await productListLoader(request);
  return {
    ...productData,
  };
}

export type Loader = typeof loader;

export default function SupermarketCategory({ loaderData }: Route.ComponentProps) {
  // console.log(loaderData.list);
  return (
    <div>
      <ProductList pagination={loaderData.pagination} list={loaderData.list} />
    </div>
  );
}
