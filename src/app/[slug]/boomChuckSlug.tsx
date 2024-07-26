"use client";
import { createSong } from "@/lib/actions";
import { Measure, Song, measureSchema } from "@/lib/schemas";
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
      name: "Submitted Song",
      measures: measures,
    };
    await createSong(submission);
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-100 md:flex-row">
      <div className="flex grow flex-col">
        <div className="flex grow gap-4 border-2 p-12">
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
        <button onClick={handleSubmit}>Submit</button>
        <div className="h-24 border-2 md:order-first">Audio bar</div>
      </div>
      <div className="min-h-40 w-full border-2 md:order-first md:w-72"></div>
    </main>
  );
}
