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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet";
import { MenuIcon } from "lucide-react";

type OpenStateMap = Map<number | string, boolean>;

export default function CategoryPanel({
  categoryTree,
  openStateMap,
}: {
  categoryTree: CategoryTreeItem[];
  openStateMap?: OpenStateMap;
}) {
  return (
    <div className="overflow-x-auto pb-4">
      {categoryTree.map((item) => (
        <Tree
          className={`-ml-6 w-max`}
          isRoot
          key={item.code}
          categoryTreeItem={item}
          openStateMap={openStateMap}
        />
      ))}
    </div>
  );
}

export function Tree({
  className = "",
  isRoot = false,
  categoryTreeItem,
  openStateMap,
}: {
  className?: string;
  isRoot?: boolean;
  categoryTreeItem: CategoryTreeItem;
  openStateMap?: OpenStateMap;
}) {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";
  const pathInfo = useMatch("/:firstSegment/*");

  const hasChildren = categoryTreeItem.children.length > 0;
  const to = `/${pathInfo?.params.firstSegment || ""}/${categoryTreeItem.code}`;

  const open = openStateMap?.has(categoryTreeItem.id)
    ? openStateMap?.get(categoryTreeItem.id)
    : categoryTreeItem.defaultOpen;

  if (hasChildren) {
    return (
      <Collapsible
        className={`${isRoot ? "" : "pl-6"} [&[data-state=open]>div>button>svg:first-child]:rotate-90 ${className}`}
        defaultOpen={open}
      >
        <div>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 cursor-pointer"
              onClick={() => {
                if (openStateMap) {
                  const open = openStateMap?.has(categoryTreeItem.id)
                    ? openStateMap?.get(categoryTreeItem.id)
                    : categoryTreeItem.defaultOpen;
                  openStateMap?.set(categoryTreeItem.id, !Boolean(open));
                }
              }}
            >
              <ChevronRightIcon className="transition-transform" />
            </Button>
          </CollapsibleTrigger>

          <CategoryNavLink to={to} content={categoryTreeItem.name} isNavigating={isNavigating} />
        </div>

        <CollapsibleContent>
          {categoryTreeItem.children.map((item) => (
            <Tree key={item.code} categoryTreeItem={item} openStateMap={openStateMap} />
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

export function CategoryPanelSheet({ categoryTree }: { categoryTree: CategoryTreeItem[] }) {
  const openStateMapRef = React.useRef<OpenStateMap>(new Map());
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    if (navigation.state === "loading") setOpen(false);
  }, [navigation.state]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <div className="mb-3 py-1 bg-accent block md:hidden">
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="cursor-pointer">
            <MenuIcon />
            <span>Category</span>
          </Button>
        </SheetTrigger>
      </div>
      <SheetContent
        side="left"
        className="gap-0 overflow-auto"
        onOpenAutoFocus={(event) => event.preventDefault()}
      >
        <SheetHeader>
          <SheetTitle>Category</SheetTitle>
        </SheetHeader>
        <div className="px-2">
          <CategoryPanel categoryTree={categoryTree} openStateMap={openStateMapRef.current} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
