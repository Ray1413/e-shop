import type { Prisma } from "@generated-prisma/client";
import prisma from "@/lib/.server/db/client";
import type { CategoryTreeItem } from "@/lib/schema/category.schema";

export const getCategoryTree = async (mainCategoryCode: string, subCategoryCode?: string) => {
  const whereInput: Prisma.CategoryWhereInput = {
    isDelete: false,
  };

  const orderByInput: Prisma.CategoryOrderByWithRelationInput = { id: "asc" };

  const categoryList = await prisma.category.findMany({
    where: whereInput,
    orderBy: orderByInput,
    select: {
      id: true,
      code: true,
      name: true,
      parentCode: true,
      level: true,
      count: true,
    },
  });

  const getChildren = (treeItem: CategoryTreeItem) => {
    const list = categoryList
      .filter((cate) => treeItem.code == cate.parentCode)
      .map(
        (item): CategoryTreeItem => ({
          ...item,
          children: [],
        }),
      );

    let selected = treeItem.code === subCategoryCode;

    list.forEach((item) => {
      const { list: childList, selected: childSelected } = getChildren(item);
      item.children = childList;
      if (item.code === subCategoryCode || childSelected) {
        selected = true;
      }
    });

    treeItem.defaultOpen = selected;

    return { list, selected };
  };

  const result: CategoryTreeItem[] = categoryList
    // .filter((item) => item.level == 0)
    .filter((item) => item.code == mainCategoryCode)
    .map((item) => ({ ...item, children: [] }));
  result.forEach((item) => {
    item.children = getChildren(item).list;
    item.defaultOpen = true;
  });

  return result;
};
