"use client";

import * as React from "react";
import { useState } from "react";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
import { Menu, MenuIcon } from "lucide-react";
import { IconMenu2, IconExternalLink } from "@tabler/icons-react";
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
import AboutDialog from "@/components/aboutDialog";
import Logo from "@/components/ui/logo";
import Avatar from "@/components/ui/avatar";
import { useSelectedLayoutSegment, usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const segment = useSelectedLayoutSegment();

  return (
    <>
      <header
        className={`sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 md:px-16`}
      >
        <div className="flex items-center justify-start gap-16">
          <Link href="/" className="flex items-center text-amber-800">
            <Logo className="mr-1 shrink-0"></Logo>
            <span className="text-2xl font-semibold">boomchuck</span>
          </Link>
        </div>
        <div className="flex items-center gap-16">
          <div
            id="nav items"
            className="hidden items-center justify-start gap-12 font-normal md:flex"
          >
            <Link
              href="/app/new-song"
              className={`${segment === "app" ? "text-sky-700 underline" : ""} font-medium underline-offset-1 hover:underline`}
            >
              App
            </Link>
            <Link
              href="/tuner"
              className={`${segment === "tuner" ? "text-sky-700 underline" : ""} font-medium underline-offset-1 hover:underline`}
            >
              Tuner
            </Link>
            <Link
              href="/guide"
              className={`${segment === "guide" ? "text-sky-700 underline" : ""} font-medium underline-offset-1 hover:underline`}
            >
              Guide
            </Link>
          </div>
          <div className="hidden gap-2 md:flex">
            <Button size="sm">Log in</Button>
            <Avatar></Avatar>
          </div>
          <div id="hamburger" className="md:hidden">
            <IconMenu2></IconMenu2>
          </div>
        </div>
      </header>
      {/* <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 py-2 md:hidden">
        <Link href="/" className="flex items-center text-amber-800">
          <Logo className="mr-1"></Logo>
          <span className="text-2xl font-semibold">boomchuck</span>
        </Link>
        <IconMenu2></IconMenu2>
      </header> */}
    </>
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

const MobileHeader = () => (
  <div className="flex justify-end sm:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MenuIcon className="h-[1.2rem] w-[1.2rem]"></MenuIcon>
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
          </React.Suspense>
        </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem asChild>
          <ModeToggle mobile={true}></ModeToggle>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);
