import { fetchSongBySlug } from "@/lib/data";
import NoSongFound from "@/app/song/[slug]/noSongFound";
import BoomChuck from "@/app/song/[slug]/boomChuckSlug";

export default async function Page({ params }: { params: { slug: string } }) {
  const song = await fetchSongBySlug(params.slug);
  if (!song) {
    return <NoSongFound></NoSongFound>;
  }

  return <BoomChuck song={song}></BoomChuck>;
}
