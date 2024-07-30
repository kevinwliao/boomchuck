// import BoomChuck from "@/components/boomChuck";
import BoomChuck from "@/app/song/[slug]/boomChuckSlug";
import { searchParamsSchema } from "@/lib/schemas";
import { fetchSongs } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    song?: "string";
  };
}) {
  const songs = await fetchSongs();
  const validatedSearchParams = searchParamsSchema.safeParse(searchParams);

  return (
    <main>
      <div className="flex items-center justify-center gap-20 px-32 py-28">
        <div
          id="hero-left"
          className="relative z-50 flex flex-1 flex-col items-start gap-6 leading-tight"
        >
          <h1 className="text-[56px] font-bold">
            Build Bluegrass Backing Tracks in Seconds
          </h1>
          <h2 className="text-xl">
            Boomchuck helps you build custom instrumentals, so you can focus on
            jamming.
          </h2>
          <div className="flex gap-4">
            <Link
              href="/song/test_user_id"
              className="w-max rounded-md bg-amber-300 px-6 py-3 transition-colors hover:bg-amber-200 active:bg-amber-400"
            >
              Get Started
            </Link>
            <Link
              href="/song/test_user_id"
              className="w-max rounded-md bg-stone-300 px-6 py-3 transition-colors hover:bg-stone-200 active:bg-stone-400"
            >
              Rocky Top
            </Link>
          </div>
        </div>

        <div id="hero-right" className="relative h-96 flex-1">
          <Image
            src="/mockup.png"
            fill
            alt="mockup"
            className="overflow-visible object-cover"
          ></Image>
        </div>
      </div>
    </main>
  );
}
