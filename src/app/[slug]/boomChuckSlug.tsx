"use client";
import { createSong } from "@/lib/actions";
import { Measure, Quality, Song, measureSchema } from "@/lib/schemas";
import {
  diatonicRootOptions,
  nonDiatonicRootOptionsA,
  nonDiatonicRootOptionsB,
  qualityOptions,
} from "@/lib/schemas";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function BoomChuck({
  initMeasures,
}: {
  initMeasures: Measure[];
}) {
  const [measures, setMeasures] = useState(initMeasures);
  const [qualitySelection, setQualitySelection] = useState<Quality>("M");

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
        <div className="flex shrink grow basis-0 overflow-scroll border-2">
          <div id="chords">
            <div className="flex flex-wrap content-start gap-4 p-6">
              {measures.map((measure) => {
                const handleDelete = () => {
                  setMeasures((prev) =>
                    prev.filter((m) => m.id !== measure.id),
                  );
                };
                return (
                  <div
                    key={measure.id}
                    className="flex h-14 w-16 flex-col items-center justify-between rounded-lg border-2 bg-white p-4 shadow-md md:h-24 md:w-28"
                  >
                    <button
                      className="hidden self-start md:block"
                      onClick={handleDelete}
                    >
                      x
                    </button>
                    <div className="text-xl font-medium">
                      {measure.chord.root}
                      {measure.chord.quality}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex h-min items-center gap-4 border-2 p-2 md:order-first">
          <button className="rounded-sm border-2 p-1 text-sm shadow-md">
            BPM
          </button>
          <button className="rounded-sm border-2 p-1 text-sm shadow-md">
            KEY
          </button>
          <button className="rounded-sm border-2 p-1 text-sm shadow-md">
            Stop
          </button>
          <button className="rounded-sm border-2 p-1 text-sm shadow-md">
            Play
          </button>
          <button className="rounded-sm border-2 p-1 text-sm shadow-md">
            Volume
          </button>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center justify-center gap-6 border-2 p-2 md:order-first md:w-72 md:p-4">
        <div
          id="rootOptionsContainer"
          className="flex flex-col gap-2 md:flex-row"
        >
          <div className="flex gap-2 md:flex-col">
            {diatonicRootOptions.map((root) => {
              return (
                <button
                  className="size-9 rounded-sm  border-2 bg-boomchuck shadow-md md:size-12"
                  onClick={() =>
                    setMeasures((prev) => [
                      ...prev,
                      {
                        id: uuid(),
                        chord: { root: root, quality: qualitySelection },
                      },
                    ])
                  }
                >
                  {root}
                </button>
              );
            })}
          </div>
          <div className="ml-7 flex gap-2 md:order-first md:ml-0 md:mt-7 md:flex-col">
            {nonDiatonicRootOptionsA.map((root) => {
              return (
                <button
                  className="size-9 rounded-sm border-2 bg-boomchuck shadow-md md:size-12"
                  onClick={() =>
                    setMeasures((prev) => [
                      ...prev,
                      {
                        id: uuid(),
                        chord: { root: root, quality: qualitySelection },
                      },
                    ])
                  }
                >
                  {root}
                </button>
              );
            })}
            <div className="size-9 md:size-12"></div>
            {nonDiatonicRootOptionsB.map((root) => {
              return (
                <button
                  className="size-9 rounded-sm border-2 bg-boomchuck shadow-md md:size-12"
                  onClick={() =>
                    setMeasures((prev) => [
                      ...prev,
                      {
                        id: uuid(),
                        chord: { root: root, quality: qualitySelection },
                      },
                    ])
                  }
                >
                  {root}
                </button>
              );
            })}
          </div>
        </div>
        <div id="qualityOptionsContainer" className="flex gap-2">
          {qualityOptions.map((quality) => (
            <button
              className={`${qualitySelection === quality ? "bg-boomchuck" : "bg-white"} size-9 rounded-sm border-2 shadow-md md:size-12`}
              onClick={() => setQualitySelection(quality)}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
