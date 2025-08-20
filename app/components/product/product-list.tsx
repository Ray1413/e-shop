import React from "react";
import { Separator } from "@/components/shadcn/ui/separator";
import PaginationBar from "@/components/pagination-bar";
import type { Pagination } from "@/lib/.server/loader/product-list.loader";
import type { ProcuctItem } from "@/lib/schema/product.schema";
import { Star, StarHalf } from "lucide-react";
import { useNavigation } from "react-router";
import { cn } from "@/components/shadcn/lib/utils";

export default function ProductList({
  pagination,
  list,
}: {
  pagination: Pagination;
  list: ProcuctItem[];
}) {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const navigation = useNavigation();
  const isNavigating = navigation.state != "idle";

  return (
    <div ref={anchorRef}>
      <PaginationBar pagination={pagination} anchor={anchorRef} />
      <Separator className="my-3" />
      {isNavigating ? (
        <div className="animate-pulse text-lg text-center">Loading...</div>
      ) : (
        <>
          {list.length > 0 ? (
            <>
              <div className="min-h-60 gap-4 grid grid-cols-1 min-[370px]:grid-cols-2 min-[560px]:grid-cols-3 min-[990px]:grid-cols-4 min-[1160px]:grid-cols-5">
                {list.map((item) => (
                  <ListItem key={item.id} item={item} className="w-full" />
                ))}
              </div>
              <Separator className="my-3" />
              <PaginationBar pagination={pagination} anchor={anchorRef} />
            </>
          ) : (
            <div className="text-lg text-center">No Item</div>
          )}
        </>
      )}
    </div>
  );
}

function ListItem({ className, item }: { className?: string; item: ProcuctItem }) {
  const [imageUrl, setImageUrl] = React.useState<string>();
  React.useEffect(() => setImageUrl(item.imageUrl), []);
  const isFirstError = React.useRef(true);

  return (
    <div className={cn("min-w-42 hover:ring-2 hover:ring-green-400 [&>*]:mb-2", className)}>
      <div test-id="image-wrapper" className="flex aspect-square">
        <img
          className="mx-auto opacity-0 transition-opacity object-contain"
          src={imageUrl}
          loading="lazy"
          onLoad={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            if (event.target instanceof HTMLImageElement) {
              event.target.style.opacity = "1";
            }
          }}
          onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) => {
            if (isFirstError.current && event.target instanceof HTMLImageElement) {
              event.target.src = "/static/blank-image-icon.jpg";
              isFirstError.current = false;
            }
          }}
        />
      </div>

      <div className="text-base line-clamp-2 min-h-12" title={item.name}>
        {item.name}
      </div>
      <div>
        <div className="flex gap-0.5 items-center">
          <div
            className="flex gap-0.5 items-center"
            title={`Average rating: ${item.averageRating.toFixed(1)}`}
          >
            <StarList rating={item.averageRating} />
          </div>
          <span className="text-sm text-gray-400" title={`${item.numberOfReviews} reviews`}>
            ({item.numberOfReviews})
          </span>
        </div>
        <span className="text-xs text-gray-400">{item.salesNumberString} &nbsp;</span>
      </div>
      <div className="text-xl text-red-700">$ {item.price}</div>
    </div>
  );
}

function FullStar() {
  return <Star className="size-4 stroke-amber-600 fill-amber-400" />;
}

function HalfStar() {
  return <StarHalf className="size-4 stroke-amber-600 fill-amber-400" />;
}

function EmptyStar() {
  return <Star className="size-4 stroke-amber-600 fill-gray-300" />;
}

function StarList({ rating }: { rating: number }) {
  const maxLength = 5;
  rating = Math.min(maxLength, rating);
  const numOfFullStar = Math.floor(rating);
  const numOfHalfStar = rating - numOfFullStar > 0 ? 1 : 0;
  const numOfEmptyStar = maxLength - numOfFullStar - numOfHalfStar;

  return (
    <>
      {numOfFullStar > 0 &&
        Array(numOfFullStar)
          .fill(0)
          .map((_, i) => <FullStar key={"f" + i} />)}

      {numOfHalfStar == 1 && <HalfStar />}

      {numOfEmptyStar > 0 &&
        Array(numOfEmptyStar)
          .fill(0)
          .map((_, i) => <EmptyStar key={"e" + i} />)}
    </>
  );
}
