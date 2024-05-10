import BoomChuck from "@/components/ui/boomChuck";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    song?: "string";
  };
}) {
  return (
    <main className="px-8 py-8">
      <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        BoomChuck
      </h2>
      <h2 className="scroll-m-20 pb-2 text-center text-2xl font-semibold tracking-tight text-stone-500 first:mt-0">
        {/* Big Spike Hammer */}
        {searchParams?.song}
      </h2>
      <BoomChuck></BoomChuck>
    </main>
  );
}
