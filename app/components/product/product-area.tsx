import React from "react";
import ProductList from "./product-list";
import CategoryBreadcrumb from "./category-breadcrumb";
import CategoryPanel from "./category-panel";

export default function ProductArea() {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <hr className="my-8" />
      <div className="flex gap-8">
        <div className="w-56 bg-gray-50">
          <CategoryPanel />
        </div>
        <div className="bg-blue-200 grow-1">
          <CategoryBreadcrumb />
          <ProductList />
        </div>
      </div>
    </div>
  );
}
