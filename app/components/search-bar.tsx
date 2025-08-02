import React from "react";
import { useMatch, useSearchParams } from "react-router";
import { navItems } from "./header";
import { Input } from "./shadcn/ui/input";
import { SearchIcon, X } from "lucide-react";
import { Button } from "./shadcn/ui/button";

export default function SearchBar() {
  const pathMatch = useMatch("/:firstSegment/*");

  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  // console.log("keyword", keyword);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.value = keyword || "";
    }
  }, [keyword]);

  const matchedNavItem = navItems.find((item) => item.href === pathMatch?.pathnameBase);

  return (
    <div className={`${matchedNavItem?.bgColor || ""} shadow-lg`}>
      <div className={`w-full max-w-4xl p-4 mx-auto`}>
        <div className="relative max-w-md bg-white">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            className="pl-8 pr-8 rounded-none"
            onKeyDown={(event) => {
              if (event.code === "Enter" && event.target instanceof HTMLInputElement) {
                setSearchParams((searchParams) => {
                  if (event.target instanceof HTMLInputElement) {
                    searchParams.set("keyword", event.target.value);
                  }
                  return searchParams;
                });
                event.target.blur();
              }
            }}
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 p-1 -translate-y-1/2 size-6 rounded-full cursor-pointer"
            onClick={() => {
              console.log("123");
              setSearchParams((searchParams) => {
                searchParams.delete("keyword");
                return searchParams;
              });
            }}
          >
            <X />
          </Button>
        </div>
      </div>
    </div>
  );
}
