import type { Category } from "@generated-prisma/client";

export type CategoryTreeItem = Pick<
  Category,
  "id" | "code" | "name" | "parentCode" | "level" | "count"
> & {
  defaultOpen?: boolean;
  children: CategoryTreeItem[];
};
