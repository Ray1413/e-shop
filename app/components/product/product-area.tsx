import React from "react";
import type { CategoryTreeItem } from "@/lib/schema/category.schema";
import CategoryPanel, { CategoryPanelSheet } from "@/components/product/category-panel";
import CategoryBreadcrumb from "@/components/product/category-breadcrumb";

export default function ProductArea({
  productContent,
  categoryTree,
}: {
  productContent?: React.ReactNode;
  categoryTree: CategoryTreeItem[];
}) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <hr className="my-8" />
      <div className="min-h-dvh flex gap-2 lg:gap-6">
        <div className="w-52 min-w-52 lg:w-56 lg:min-w-56 hidden md:block transition-all">
          <div className="min-h-1/2 bg-accent/50">
            <CategoryPanel categoryTree={categoryTree} />
          </div>
        </div>
        <div className="-mt-8 md:mt-0 grow-1">
          <CategoryPanelSheet categoryTree={categoryTree} />
          <div className="px-2">
            <CategoryBreadcrumb categoryTree={categoryTree} />
            {productContent}
          </div>
        </div>
      </div>
    </div>
  );
}
