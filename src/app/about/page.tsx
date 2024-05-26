export default function Page() {
  return (
    <main className="mx-8 py-6 dark:bg-stone-950 sm:mx-14 lg:mx-60">
      <h2 className="scroll-m-20 pb-2 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
        About BoomChuck
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Named after the "boom-chuck" of a bluegrass rhythm section, BoomChuck is
        a free tool created to help bluegrass musicians practice with
        accompaniment. Load a song, or build your own using the chord builder.
        You can enter chords with the chord builder, or add them to your palette
        for reuse. Drag and drop to rearrange! Happy jamming!
      </p>
    </main>
  );
}
