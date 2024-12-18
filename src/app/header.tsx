import * as React from "react";
import { IconMenu2, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignInButton } from "@/components/signInButton";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import Logo from "@/components/ui/logo";
import Avatar from "@/components/ui/avatar";
import LogoIcon from "@/components/ui/logo-icon";

export default function Header() {
  return (
    <>
      <header
        className={`sticky top-0 z-50 grid h-14 shrink-0 grid-cols-6 items-center justify-between border-b bg-background px-4 md:px-4`}
      >
        <div className="col-span-1 flex w-min items-center justify-start gap-16 sm:col-span-2">
          <Link href="/" className="flex items-center text-amber-800">
            <Logo className="mr-1 size-8 shrink-0"></Logo>
            <span className="hidden text-2xl font-semibold md:inline">
              boomchuck
            </span>
          </Link>
          <div
            id="nav items"
            className="invisible hidden items-center justify-start gap-12 font-normal md:flex"
          >
            <Link
              href="/app"
              className={`font-medium underline-offset-1 hover:underline`}
            >
              App
            </Link>
            <Link
              href="/form"
              className={`font-medium underline-offset-1 hover:underline`}
            >
              Form
            </Link>
          </div>
        </div>
        <div className="col-span-4 flex justify-center sm:col-span-2">
          <Title></Title>
        </div>

        <div className="w-in col-span-1 flex items-center justify-end gap-16 sm:col-span-2">
          <div className="hidden gap-2 md:flex">
            {/* @ts-ignore */}
            <SignInButton></SignInButton>
            {/* @ts-ignore */}
            <Avatar></Avatar>
          </div>
          <div id="hamburger" className="md:hidden">
            <IconMenu2></IconMenu2>
          </div>
        </div>
      </header>
    </>
  );
}
