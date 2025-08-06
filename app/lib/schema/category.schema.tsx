import { type Category } from "@prisma/client";

export type CategoryTreeItem = Pick<
  Category,
  "id" | "code" | "name" | "parentCode" | "level" | "count"
> & {
  defaultOpen?: boolean;
  children: CategoryTreeItem[];
};
