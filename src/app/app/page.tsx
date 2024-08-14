import React from "react";
import BoomChuck from "@/app/app/[slug]/boomChuckSlug";
import { fetchSongs } from "@/lib/data";
import { auth } from "@/auth";

type Props = {};

export default async function Page({}: Props) {
  const songs = await fetchSongs();
  const session = await auth();

  return <BoomChuck songs={songs} session={session}></BoomChuck>;
}
