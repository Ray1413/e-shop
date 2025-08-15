import type { Product } from "@generated-prisma/client";

export type ProcuctItem = Pick<
  Product,
  | "id"
  | "code"
  | "name"
  | "summary"
  | "imageUrl"
  | "brandName"
  | "averageRating"
  | "numberOfReviews"
  | "salesNumberString"
> & {
  price: string;
};
