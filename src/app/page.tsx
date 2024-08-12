// import BoomChuck from "@/components/boomChuck";
import BoomChuck from "@/app/app/[slug]/boomChuckSlug";
import { searchParamsSchema } from "@/lib/schemas";
import { fetchSongs } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/app/header";
import Footer from "@/app/footer";

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
    <>
      <main className="z-0 flex grow flex-col">
        {/* <div className="flex flex-col items-center justify-center gap-12 bg-amber-700 px-5 py-16 text-white sm:flex-row sm:gap-20 sm:px-32 sm:py-28">
          <div
            id="hero-left"
            className="relative z-50 flex flex-col items-start gap-6 sm:flex-1"
          >
            <h1 className="text-[40px] font-bold leading-tight sm:text-[56px]">
              Build Bluegrass Backing Tracks in Seconds
            </h1>
            <h2 className="text-pretty text-base sm:text-xl">
              Boomchuck helps you build custom instrumentals, so you can focus
              on jamming.
            </h2>
            <div className="flex gap-4">
              <Button
                size="default"
                className="bg-white text-amber-900 hover:bg-white/95"
              >
                <Link href="/app/new-song">Get Started</Link>
              </Button>
              <Button
                size="default"
                variant="secondary"
                className="bg-amber-800 text-white hover:bg-amber-800/90"
              >
                <Link href="/app/test_user_id">See an Example</Link>
              </Button>
            </div>
          </div>

          <div
            id="hero-right"
            className="relative h-[20rem] w-full rounded-3xl bg-stone-950/20 sm:flex-1"
          ></div>
        </div> */}
        <div className="flex flex-col items-center justify-center gap-12 bg-white px-5 py-16 sm:flex-row sm:gap-20 sm:px-32 sm:py-28">
          <div
            id="hero-left"
            className="relative z-50 flex flex-col items-start gap-6 sm:flex-1"
          >
            <h1 className="text-[40px] font-bold leading-tight sm:text-[56px]">
              Build Bluegrass Backing Tracks in Seconds
            </h1>
            <h2 className="text-pretty text-base sm:text-xl">
              Boomchuck helps you build custom instrumentals, so you can focus
              on jamming.
            </h2>
            <div className="flex gap-4">
              <Button
                size="default"
                className="bg-amber-600 text-white"
                asChild
              >
                <Link href="/app">Get Started</Link>
              </Button>
              <Button size="default" variant="secondary" asChild>
                <Link href="/app/long-journey-home">See an Example</Link>
              </Button>
            </div>
          </div>

          <div
            id="hero-right"
            className="relative h-[20rem] w-full rounded-3xl bg-stone-950/20 sm:flex-1"
          >
            {/* <Image
            src="/mockup.png"
            fill
            alt="mockup"
            className="object-cover"
          ></Image> */}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}
