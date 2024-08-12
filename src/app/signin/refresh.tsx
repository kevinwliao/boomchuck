"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function Refresh({}: Props) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);
  return <div></div>;
}
