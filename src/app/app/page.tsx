import React from "react";
import BoomChuck from "@/app/app/[slug]/boomChuckSlug";
import { fetchSongs } from "@/lib/data";

type Props = {};

export default async function Page({}: Props) {
  const songs = await fetchSongs();

  return <BoomChuck songs={songs} session={null}></BoomChuck>;
}
