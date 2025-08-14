import prisma from "prisma/client";
import { Prisma } from "@prisma/client";
import { defaultPageSize } from "../loader/product-list.loader";

export type ListRequest = {
  searchKeyword?: string;
  take: number;
  skip: number;
  orderByInput: Prisma.ProductOrderByWithAggregationInput;
};

export const getProductList = async (categoryCode: string, listRequest: ListRequest) => {
  const searchKeyword = listRequest.searchKeyword || "";
  const categoryArr = [];
  // AA11 11 23 30 051
  const code0 = categoryCode.substring(0, 4);
  if (categoryCode.length == 13) {
    categoryArr.push(code0);

    const code1 = categoryCode.substring(4, 6);
    if (code1 != "00") categoryArr.push(code1);

    const code2 = categoryCode.substring(6, 8);
    if (code2 != "00") categoryArr.push(code2);

    const code3 = categoryCode.substring(8, 10);
    if (code3 != "00") categoryArr.push(code3);
  }
  const categoryCodeSearchString = categoryArr.length > 0 ? categoryArr.join("") : undefined;

  const whereInput: Prisma.ProductWhereInput = {
    OR: [
      {
        name: {
          contains: searchKeyword,
        },
      },
      {
        summary: {
          contains: searchKeyword,
        },
      },
    ],
    primaryCatCode: {
      startsWith: categoryCodeSearchString,
    },
  };

  const pageSize = listRequest?.take || defaultPageSize;
  let skip = listRequest?.skip || 0;

  const count = await prisma.product.count({
    where: whereInput,
  });

  if (skip > count) {
    const totalPage = Math.floor(count / pageSize) + 1;
    skip = (totalPage - 1) * pageSize;
  }

  const list = await prisma.product.findMany({
    where: whereInput,
    orderBy: listRequest?.orderByInput,
    take: pageSize,
    skip,
    select: {
      id: true,
      code: true,
      name: true,
      price: true,
      summary: true,
      imageUrl: true,
      brandName: true,
      averageRating: true,
      numberOfReviews: true,
      salesNumberString: true,
    },
  });

  const transformedList = list.map((item) => ({
    ...item,
    price: item.price.toFixed(2),
  }));

  return { list: transformedList, count };
};
