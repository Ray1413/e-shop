import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/ui/breadcrumb";
import { useMatch, useSearchParams } from "react-router";
import type { CategoryTreeItem } from "@/lib/schema/category.schema";

const flattenCategoryTree = (categoryTree: CategoryTreeItem[]) => {
  return categoryTree.reduce(
    (result: CategoryTreeItem[], curr: CategoryTreeItem): CategoryTreeItem[] => {
      return [...result, { ...curr, children: [] }, ...flattenCategoryTree(curr.children)];
    },
    [],
  );
};

const getBreadcrumbList = (
  flatCategoryTree: CategoryTreeItem[],
  categoryItem?: CategoryTreeItem,
): CategoryTreeItem[] => {
  if (categoryItem) {
    return [
      ...getBreadcrumbList(
        flatCategoryTree,
        flatCategoryTree.find((item) => item.code === categoryItem.parentCode),
      ),
      categoryItem,
    ];
  }
  return [];
};

export default function CategoryBreadcrumb({ categoryTree }: { categoryTree: CategoryTreeItem[] }) {
  const pathInfo = useMatch("/:firstSegment/:category?");
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("keyword");

  const flatCategoryTree = flattenCategoryTree(categoryTree);
  const currentCategory = pathInfo?.params.category
    ? flatCategoryTree.find((item) => item.code === pathInfo?.params.category)
    : undefined;
  const breadcrumbList = getBreadcrumbList(flatCategoryTree, currentCategory);

  return (
    <div className="py-1">
      {breadcrumbList.length > 1 ? (
        <Breadcrumb>
          <BreadcrumbList className="text-base">
            {breadcrumbList.flatMap((item, index, arr) => {
              const list: React.ReactNode[] = [
                <BreadcrumbItem key={item.code}>
                  <BreadcrumbPage>{item.name}</BreadcrumbPage>
                </BreadcrumbItem>,
              ];

              if (index != arr.length - 1) list.push(<BreadcrumbSeparator key={index} />);

              return list;
            })}

            {Boolean(searchKeyword) && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <span className="text-orange-800">"{searchKeyword}"</span>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
