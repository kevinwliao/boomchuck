"use client";

import * as React from "react";
import { useState } from "react";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
import { Menu, MenuIcon } from "lucide-react";
import { IconMenu2 } from "@tabler/icons-react";
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
import Logo from "@/components/ui/logo";

export default function Header() {
  return (
    <>
      <header className="hidden h-14 shrink-0 grid-cols-3 items-center justify-between border-b bg-background px-4 md:grid ">
        <Link href="/" className="flex items-center text-amber-900">
          <Logo className="mr-1"></Logo>
          <span className="text-2xl font-semibold">boomchuck</span>
        </Link>
        <div className="place-self-center rounded-lg border px-2 py-1 ">
          Long Journey Home
        </div>
        <div className="self-center justify-self-end">Sign in</div>
      </header>
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 py-2 md:hidden">
        <Link href="/" className="flex items-center text-amber-900">
          <Logo className="mr-1"></Logo>
          <span className="text-2xl font-semibold">boomchuck</span>
        </Link>
        <IconMenu2></IconMenu2>
      </header>
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
