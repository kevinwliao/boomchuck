import * as React from "react";
import { IconMenu2, IconExternalLink } from "@tabler/icons-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignInButton } from "@/components/signInButton";
import { Button } from "@/components/ui/button";

import Logo from "@/components/ui/logo";
import Avatar from "@/components/ui/avatar";

export default function Header() {
  return (
    <>
      <header
        className={`sticky top-0 z-50 flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 md:px-4`}
      >
        <div className="flex items-center justify-start gap-16">
          <Link href="/" className="flex items-center text-amber-800">
            <Logo className="mr-1 shrink-0"></Logo>
            <span className="text-2xl font-semibold">boomchuck</span>
          </Link>
          <div
            id="nav items"
            className="hidden items-center justify-start gap-12 font-normal md:flex"
          >
            <Link
              href="/app"
              className={`font-medium underline-offset-1 hover:underline`}
            >
              App
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-16">
          <div className="hidden gap-2 md:flex">
            {/* @ts-expect-error Async Server Component */}
            <SignInButton></SignInButton>
            {/* @ts-expect-error Async Server Component */}
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
