import React from "react";
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import b0URL from "@/assets/banner-0.jpg";
import b1URL from "@/assets/banner-1.jpg";
import b2URL from "@/assets/banner-2.jpg";
import b3URL from "@/assets/banner-3.jpg";
import b4URL from "@/assets/banner-4.jpg";
import b5URL from "@/assets/banner-5.jpg";
import b6URL from "@/assets/banner-6.jpg";
import b7URL from "@/assets/banner-7.jpg";
import b8URL from "@/assets/banner-8.jpg";
import b9URL from "@/assets/banner-9.jpg";

const urlList = [b0URL, b1URL, b2URL, b3URL, b4URL, b5URL, b6URL, b7URL, b8URL, b9URL];

const bannerList = [
  { url: b0URL, bgColor: "rgb(124, 188, 211)" },
  { url: b1URL, bgColor: "rgb(235, 229, 224)" },
  { url: b2URL, bgColor: "rgb(231, 236, 235)" },
  { url: b3URL, bgColor: "rgb(226, 234, 239)" },
  { url: b4URL, bgColor: "rgb(146, 182, 136)" },
  { url: b5URL, bgColor: "rgb(227, 212, 231)" },
  { url: b6URL, bgColor: "rgb(232, 227, 219)" },
  { url: b7URL, bgColor: "rgb(207, 198, 187)" },
  { url: b8URL, bgColor: "rgb(215, 222, 222)" },
  { url: b9URL, bgColor: "rgb(213, 230, 235)" },
];

export default function Banner() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 size-full opacity-50 transition-colors duration-1000"
        style={{ backgroundColor: bannerList[current].bgColor }}
      ></div>
      <Carousel
        setApi={setApi}
        className="w-full max-w-5xl mx-auto"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {bannerList.map((banner, index) => (
            <CarouselItem key={index}>
              <div>
                <img src={banner.url} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
