import React from "react";

import { NavLink, useNavigation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/ui/navigation-menu";
import SearchBar from "./search-bar";
import Banner from "./banner";

const defaultActiveClassName = "bg-accent";
const defaultClassName = "hover:bg-accent";

export const navItems = [
  {
    id: "AA11000000000",
    href: "/supermarket",
    label: "Supermarket",
    bgColor: "bg-lime-400",
    activeClassName: "text-lime-900 bg-lime-400",
    className: "hover:text-lime-900 hover:bg-lime-400",
  },
  {
    id: "AA13000000000",
    label: "Personal Care & Health",
    href: "/personal-care-and-health",
    bgColor: "bg-yellow-500",
    activeClassName: "text-yellow-900 bg-yellow-500",
    className: "hover:text-yellow-900 hover:bg-yellow-500",
  },
  {
    id: "AA16000000000",
    label: "Skincare & Makeup",
    href: "/skincare-and-makeup",
    bgColor: "bg-pink-300",
    activeClassName: "text-pink-900 bg-pink-300",
    className: "hover:text-pink-900 hover:bg-pink-300",
  },
  {
    id: "AA28000000000",
    href: "/mother-and-baby",
    label: "Mother & Baby",
    bgColor: "bg-cyan-300",
    activeClassName: "text-cyan-900 bg-cyan-300",
    className: "hover:text-cyan-900 hover:bg-cyan-300",
  },
  {
    id: "AA31000000000",
    href: "/gadgets-and-electronics",
    label: "Gadgets & Electronics",
    bgColor: "bg-blue-400",
    activeClassName: "text-blue-900 bg-blue-400",
    className: "hover:text-blue-900 hover:bg-blue-400",
  },
  {
    id: "AA32000000000",
    label: "Home Appliances",
    href: "/home-appliances",
    bgColor: "bg-cyan-300",
    activeClassName: "text-cyan-900 bg-cyan-300",
    className: "hover:text-cyan-900 hover:bg-cyan-300",
  },
  {
    id: "AA18000000000",
    label: "Housewares",
    href: "/housewares",
    bgColor: "bg-yellow-300",
    activeClassName: "text-yellow-900 bg-yellow-300",
    className: "hover:text-yellow-900 hover:bg-yellow-300",
  },
  {
    id: "AA73000000000",
    label: "Sports & Travel",
    href: "/sports-and-travel",
    bgColor: "bg-lime-300",
    activeClassName: "text-lime-900 bg-lime-300",
    className: "hover:text-lime-900 hover:bg-lime-300",
  },
];

export default function Header() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <>
      <div>
        <div className="w-full max-w-6xl mx-auto border-x-0 border-amber-200">
          <div className="p-6">
            <p className="text-center font-bold text-inherit text-4xl">
              <span className="text-green-700">Demo </span>
              <span className="text-lime-500">Mall</span>
            </p>
          </div>
          <NavigationMenu className="mx-auto block overflow-auto">
            <NavigationMenuList className="gap-0 w-max">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink asChild className="rounded-none p-0 whitespace-nowrap">
                    <div>
                      <NavLink
                        to={item.href}
                        className={({ isActive, isPending, isTransitioning }) =>
                          [
                            isPending ? "opacity-80" : "",
                            (!isNavigating && isActive) || (isNavigating && isPending)
                              ? `${item.activeClassName || defaultActiveClassName} shadow-[0px_0px_2px_rgb(0,0,0,0.25)]`
                              : "hover:shadow-[0px_0px_2px_rgb(0,0,0,0.25)]",
                            isTransitioning ? "" : "",
                          ].join(" ") +
                          ` p-2 font-semibold ${item.className || defaultClassName} transition-opacity`
                        }
                      >
                        {item.label}
                      </NavLink>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="sticky top-0 z-30">
        <SearchBar />
      </div>
      <Banner />
    </>
  );
}
