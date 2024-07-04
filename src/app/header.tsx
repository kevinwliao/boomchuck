"use client";

import * as React from "react";
import { useState } from "react";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
import { Menu, MenuIcon } from "lucide-react";
import Link from "next/link";
import ModeToggle from "@/components/toggle";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import SongSelection from "@/components/songSelection";
import Socials from "@/components/socials";
import AboutDialog from "@/components/aboutDialog";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b bg-background p-1">
      <div className="hidden sm:block">
        <NavigationMenu className="m-auto justify-between sm:justify-center">
          <NavigationMenuList className="">
            <NavigationMenuItem className="">
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <MusicalNoteIcon className="mr-1 size-4"></MusicalNoteIcon>
                  <span>BoomChuck</span>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <AboutDialog></AboutDialog>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <React.Suspense>
                <SongSelection mobile={false}></SongSelection>
              </React.Suspense>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ModeToggle mobile={false}></ModeToggle>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex justify-end sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MenuIcon className="h-[1.2rem] w-[1.2rem] "></MenuIcon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="block sm:hidden">
            <DropdownMenuItem asChild>
              <AboutDialog></AboutDialog>
            </DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem asChild>
              <React.Suspense>
                <SongSelection mobile={true}></SongSelection>
              </React.Suspense>{" "}
            </DropdownMenuItem>
            <DropdownMenuSeparator></DropdownMenuSeparator>
            <DropdownMenuItem asChild>
              <ModeToggle mobile={true}></ModeToggle>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
