import { Button } from "@/components/ui/button";
import React from "react";
import { SignInButton } from "@/components/signInButton";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import Link from "next/link";

type Props = {};

export default function Page({}: Props) {
  return (
    <main className="flex grow items-center justify-center">
      <section className="flex flex-col items-center gap-4">
        <IconCircleDashedCheck className="size-12 text-green-600"></IconCircleDashedCheck>
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold">You are logged out.</h2>
          <h3 className="text-xl text-stone-600">Thanks for jamming!</h3>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary">
            <Link href="/">Home</Link>
          </Button>
          {/* @ts-ignore */}
          <SignInButton></SignInButton>
        </div>
      </section>
    </main>
  );
}
