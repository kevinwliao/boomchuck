import { fetchSongBySlug } from "@/lib/data";
import NoSongFound from "@/app/[slug]/noSongFound";
import BoomChuck from "@/app/[slug]/boomChuckSlug";

export default async function Page({ params }: { params: { slug: string } }) {
  const song = await fetchSongBySlug(params.slug);
  if (!song) {
    return <NoSongFound></NoSongFound>;
  }
  return <BoomChuck initMeasures={song.measures}></BoomChuck>;
}
