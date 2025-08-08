import React from "react";

export default function ProductArea({
  categoryPanel,
  categoryBreadcrumb,
  productList,
}: {
  categoryPanel: React.ReactNode;
  categoryBreadcrumb: React.ReactNode;
  productList?: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <hr className="my-8" />
      <div className="flex gap-6">
        <div className="w-64 bg-gray-50">{categoryPanel}</div>
        <div className="bg-blue-200 grow-1">
          {categoryBreadcrumb}
          {productList}
        </div>
      </div>
    </div>
  );
}
