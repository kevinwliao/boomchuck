import { fetchSongBySlug, fetchSongs } from "@/lib/data";
import NoSongFound from "@/app/app/[slug]/noSongFound";
import BoomChuck from "@/app/app/[slug]/boomChuckSlug";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const song = await fetchSongBySlug(params.slug);
  const songs = await fetchSongs();

  if (!song) {
    redirect("/app");
  }

  return <BoomChuck song={song} songs={songs}></BoomChuck>;
}
