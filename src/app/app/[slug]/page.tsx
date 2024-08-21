import { fetchSongBySlug, fetchSongs } from "@/lib/data";
import NoSongFound from "@/app/app/[slug]/noSongFound";
import BoomChuck from "@/app/app/[slug]/boomChuckSlug";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import type { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const song = await fetchSongBySlug(params.slug);

  return {
    title: song.name,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const song = await fetchSongBySlug(params.slug);
  const songs = await fetchSongs();
  const session = await auth();

  if (!song) {
    redirect("/app");
  }

  return (
    <>
      <BoomChuck song={song} songs={songs} session={session}></BoomChuck>
    </>
  );
}
