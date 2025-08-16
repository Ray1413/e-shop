import React from "react";
import { Pagination, PaginationContent, PaginationItem } from "@/components/shadcn/ui/pagination";
import { Button, buttonVariants } from "@/components/shadcn/ui/button";
import { cn } from "@/components/shadcn/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Link, useLocation, useNavigation, useSearchParams } from "react-router";
import type { Pagination as PaginationType } from "@/lib/.server/loader/product-list.loader";

export default function PaginationBar({
  pagination,
  anchor,
}: {
  pagination: PaginationType;
  anchor: React.RefObject<HTMLDivElement | null>;
}) {
  const [, setSearchParams] = useSearchParams();
  const navigation = useNavigation();
  const pendingLocation = navigation.location;
  const currentLocation = useLocation();
  const isNavigating = Boolean(pendingLocation);

  const pendingSearchParams = new URLSearchParams(pendingLocation?.search);

  const pendingPageInt = parseInt(pendingSearchParams.get("page") || "1");
  const pendingPage = pendingLocation && !isNaN(pendingPageInt) ? pendingPageInt : undefined;
  const currentPage = pagination.currentPage;

  const createUrl = (page: number) => {
    const searchParams = new URLSearchParams(currentLocation?.search);
    searchParams.set("page", page.toString());
    return currentLocation.pathname + "?" + searchParams.toString();
  };

  const totalPage: number = pagination.totalPage;
  const paginationButtonCount = 7;
  let paginationButtonList: number[] = [];

  if (totalPage <= paginationButtonCount) {
    paginationButtonList = new Array(totalPage).fill(0).map((_, index) => index + 1);
  } else {
    let left = currentPage - 1;
    let right = currentPage + 1;
    let isLeft = false;
    paginationButtonList = [currentPage];
    while (paginationButtonList.length < paginationButtonCount) {
      if (isLeft && left > 0) {
        paginationButtonList.unshift(left);
        left--;
      }
      if (!isLeft && right <= totalPage) {
        paginationButtonList.push(right);
        right++;
      }
      isLeft = !isLeft;
    }
  }

  const handlePaginationButtonClick = () => {
    // https://www.javascripttutorial.net/dom/css/check-if-an-element-is-visible-in-the-viewport/#:~:text=Summary%20%C2%B7%20Use%20the%20getBoundingClientRect()%20method%20to,and%20its%20relative%20position%20to%20the%20viewport.
    if (anchor.current && anchor.current.getBoundingClientRect().top <= 0) {
      if (typeof window != "undefined") {
        window.scrollTo(0, anchor.current.offsetTop - 68); // 68 -> The height of search bar
      }
    }
  };

  return (
    <div className="pt-2 pb-1 flex justify-between items-center">
      <div className="text-sm">
        <span>
          Page: {currentPage} / {pagination.totalPage}
        </span>
        <span className="inline-block ml-3"></span>
        <span>Total Product: {pagination.totalItem}</span>
      </div>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem key={-1}>
            <PaginationPreviousBtn
              disabled={currentPage <= 1 || Boolean(isNavigating)}
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                handlePaginationButtonClick();
                setSearchParams(
                  (searchParams) => {
                    searchParams.set("page", Math.max(currentPage - 1, 1).toString());
                    return searchParams;
                  },
                  { preventScrollReset: true },
                );
              }}
            />
          </PaginationItem>

          {paginationButtonList.map((page) => (
            <PaginationItem key={page}>
              <Link
                preventScrollReset
                onClick={handlePaginationButtonClick}
                to={createUrl(page)}
                className={[
                  buttonVariants({ variant: "ghost" }),
                  page === currentPage
                    ? "text-white bg-green-600 hover:text-white hover:bg-green-600/90"
                    : "",
                  page === pendingPage ? "animate-bounce" : "",
                ].join(" ")}
              >
                {page}
              </Link>
            </PaginationItem>
          ))}

          <PaginationItem key={-2}>
            <PaginationNextBtn
              disabled={currentPage == totalPage || Boolean(isNavigating)}
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                handlePaginationButtonClick();
                setSearchParams(
                  (searchParams) => {
                    searchParams.set("page", Math.min(currentPage + 1, totalPage).toString());
                    return searchParams;
                  },
                  { preventScrollReset: true },
                );
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export function PaginationPreviousBtn({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to previous page"
      variant="ghost"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5 cursor-pointer", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </Button>
  );
}

export function PaginationNextBtn({ className, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Go to next page"
      variant="ghost"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5 cursor-pointer", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </Button>
  );
}
