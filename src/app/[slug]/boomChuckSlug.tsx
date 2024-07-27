"use client";
import { createSong } from "@/lib/actions";
import { Measure, Song, measureSchema } from "@/lib/schemas";
import { rootOptions, qualityOptions } from "@/lib/schemas";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function BoomChuck({
  initMeasures,
}: {
  initMeasures: Measure[];
}) {
  const [measures, setMeasures] = useState(initMeasures);

  const handleSubmit = async () => {
    const submission: Song = {
      userId: "new_user_id",
      name: "Lots of measures",
      measures: measures,
    };
    await createSong(submission);
  };

  return (
    <main className="flex grow flex-col bg-slate-100 md:flex-row">
      <div className="flex grow flex-col">
        <div className="flex shrink grow basis-0 overflow-scroll border-2 p-6">
          <div id="chords" className="flex flex-wrap content-start gap-10">
            {measures.map((measure) => {
              const handleDelete = () => {
                setMeasures((prev) => prev.filter((m) => m.id !== measure.id));
              };
              return (
                <div
                  key={measure.id}
                  className="flex h-24 w-24 items-center justify-center rounded-lg border-2 bg-white shadow-md"
                >
                  <button onClick={handleDelete}>delete</button>
                  <div className="text-2xl font-medium">
                    {measure.chord.root}
                    {measure.chord.quality}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex h-min items-center gap-4 border-2 p-4 md:order-first">
          <button className="border-2 p-4 shadow-md">BPM</button>
          <button className="border-2 p-4 shadow-md">KEY</button>
          <button className="border-2 p-4 shadow-md">Stop</button>
          <button className="border-2 p-4 shadow-md">Play</button>
          <button className="border-2 p-4 shadow-md">Volume</button>
        </div>
      </div>
      <div className="min-h-40 w-full shrink-0 border-2 md:order-first md:w-72">
        {rootOptions.map((root) => (
          // button to insert a new measure
          <button
            className="size-12 border-2"
            onClick={() =>
              setMeasures((prev) => [
                ...prev,
                { id: uuid(), chord: { root: root, quality: "M" } },
              ])
            }
          >
            {root}
          </button>
        ))}
      </div>
    </main>
  );
}
