import BoomChuck from "@/components/boomChuck";
import { searchParamsSchema } from "@/lib/schemas";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    song?: "string";
  };
}) {
  const validatedSearchParams = searchParamsSchema.safeParse(searchParams);

  return (
    <main className="min-w-fit p-4 dark:bg-stone-950 md:p-8">
      <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        BoomChuck
      </h2>
      <h2 className="scroll-m-20 pb-2 text-center text-2xl font-semibold tracking-tight text-muted-foreground first:mt-0">
        {validatedSearchParams?.data?.song || "New BoomChuck"}
      </h2>

      <BoomChuck></BoomChuck>
    </main>
  );
}
