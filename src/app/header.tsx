"use client";

import * as React from "react";
import { useState } from "react";
import { MusicalNoteIcon } from "@heroicons/react/16/solid";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ModeToggle } from "@/components/toggle";
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
import { SongSelection } from "@/components/songSelection";
import Socials from "@/components/socials";
import AboutDialog from "@/components/aboutDialog";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 overflow-hidden border-b bg-background p-1">
      <NavigationMenu className="m-auto">
        <NavigationMenuList className="">
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <MusicalNoteIcon className="mr-1 size-4"></MusicalNoteIcon>
                BoomChuck
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <AboutDialog></AboutDialog>
          </NavigationMenuItem>
          {/* <NavigationMenuItem>
            <Link href="/about" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                About
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <SongSelection></SongSelection>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ModeToggle></ModeToggle>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
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
