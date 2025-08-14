import React from "react";

export default function ProductArea({
  categoryPanel,
  categoryBreadcrumb,
  productContent,
}: {
  categoryPanel: React.ReactNode;
  categoryBreadcrumb: React.ReactNode;
  productContent?: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <hr className="my-8" />
      <div className="flex gap-6">
        <div className="w-56 min-w-56 bg-gray-50">{categoryPanel}</div>
        <div className="grow-1">
          {categoryBreadcrumb}
          {productContent}
        </div>
      </div>
    </div>
  );
}
