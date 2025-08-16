import React from "react";
import { matchPath } from "react-router";
import { navItems } from "@/components/header";
import { getProductList } from "@/lib/.server/service/product.service";

export type Pagination = {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalItem: number;
};

export const defaultPageSize = 20;

export default async function productListLoader(request: Request) {
  const url = new URL(request.url);
  const pathInfo = matchPath("/:firstSegment/:category?", url.pathname);
  const mainCategoryCode = navItems.find((item) =>
    item.href.startsWith("/" + pathInfo?.params.firstSegment),
  )?.id;
  const subCategoryCode = pathInfo?.params.category;
  const categoryCode = subCategoryCode || mainCategoryCode || "";

  const currentPageString = url.searchParams.get("page") || "";
  let currentPage = isNaN(parseInt(currentPageString)) ? 1 : parseInt(currentPageString);

  const orderByString = url.searchParams.get("orderBy") || "";
  const [field, order] = orderByString.split(".");
  const orderBy = {
    [field ? field : "id"]: ["asc", "desc"].includes(order) ? order : "asc",
  };

  const { list, count } = await getProductList(categoryCode, {
    searchKeyword: url.searchParams.get("keyword") || undefined,
    take: defaultPageSize,
    skip: (currentPage - 1) * defaultPageSize,
    orderByInput: orderBy,
  });

  const totalPage = count == 0 ? 0 : Math.floor(count / defaultPageSize) + 1;
  currentPage = Math.min(currentPage, totalPage);

  const pagination: Pagination = {
    currentPage,
    pageSize: defaultPageSize,
    totalPage,
    totalItem: count,
  };

  // await new Promise((res) => setTimeout(res, 1000));

  return {
    list,
    pagination,
  };
}
