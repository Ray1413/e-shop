import React from "react";
import { NavLink, useMatch, useNavigation } from "react-router";
import type { CategoryTreeItem } from "@/lib/schema/category.schema";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/ui/collapsible";
import { Button } from "@/components/shadcn/ui/button";
import { ChevronRightIcon } from "lucide-react";

export default function CategoryPanel({ categoryTree }: { categoryTree: CategoryTreeItem[] }) {
  return (
    <div className="min-h-dvh overflow-x-auto">
      {categoryTree.map((item) => (
        <Tree className={`-ml-6 w-max`} isRoot key={item.code} categoryTreeItem={item} />
      ))}
    </div>
  );
}

export function Tree({
  className = "",
  isRoot = false,
  categoryTreeItem,
}: {
  className?: string;
  isRoot?: boolean;
  categoryTreeItem: CategoryTreeItem;
}) {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  const pathInfo = useMatch("/:firstSegment/*");

  const hasChildren = categoryTreeItem.children.length > 0;
  const to = `/${pathInfo?.params.firstSegment || ""}/${categoryTreeItem.code}`;
  if (hasChildren) {
    return (
      <Collapsible
        className={`${isRoot ? "" : "pl-6"} [&[data-state=open]>div>button>svg:first-child]:rotate-90 ${className}`}
        defaultOpen={categoryTreeItem.defaultOpen}
      >
        <div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8 cursor-pointer">
              <ChevronRightIcon className="transition-transform" />
            </Button>
          </CollapsibleTrigger>

          <CategoryNavLink to={to} content={categoryTreeItem.name} isNavigating={isNavigating} />
        </div>

        <CollapsibleContent>
          {categoryTreeItem.children.map((item) => (
            <Tree key={item.code} categoryTreeItem={item} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  }
  return (
    <div className="pl-8">
      <CategoryNavLink to={to} content={categoryTreeItem.name} isNavigating={isNavigating} />
    </div>
  );
}

const CategoryNavLink = ({
  to,
  content,
  isNavigating,
}: {
  to: string;
  content: string;
  isNavigating: boolean;
}) => {
  return (
    <NavLink
      preventScrollReset
      to={to}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? "" : "",
          (!isNavigating && isActive) || (isNavigating && isPending)
            ? `text-blue-600`
            : "hover:text-blue-500",
          isTransitioning ? "" : "",
          "relative text-[15px]",
        ].join(" ")
      }
    >
      {content}
    </NavLink>
  );
};
