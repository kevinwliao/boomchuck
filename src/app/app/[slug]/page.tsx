import { fetchSongBySlug } from "@/lib/data";
import NoSongFound from "@/app/app/[slug]/noSongFound";
import BoomChuck from "@/app/app/[slug]/boomChuckSlug";

export default async function Page({ params }: { params: { slug: string } }) {
  const song = await fetchSongBySlug(params.slug);
  // if (!song) {
  //   return <NoSongFound></NoSongFound>;
  // }

  return <BoomChuck song={song}></BoomChuck>;
}
