"use client";
import { createSong } from "@/lib/actions";
import { Measure, Quality, Song, measureSchema } from "@/lib/schemas";
import {
  diatonicRootOptions,
  nonDiatonicRootOptionsA,
  nonDiatonicRootOptionsB,
  qualityOptions,
} from "@/lib/schemas";
import {
  IconPlayerStopFilled,
  IconPlayerPlayFilled,
  IconRepeat,
  IconVolume,
  IconMetronome,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
} from "@tabler/icons-react";
import { FolderOpen, Save } from "lucide-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const sharp = "\u266f";
const flat = "\u266d";
const placeAccidentals = (str: string) => <>{str.replace("#", sharp)}</>;

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
    <main className="flex grow flex-col bg-neutral-100 lg:flex-row">
      <div className="flex grow flex-col">
        <div className="flex grow basis-0 justify-center overflow-scroll border lg:justify-normal">
          <div id="chords">
            <div className="grid grid-cols-4 flex-wrap gap-x-2 gap-y-4 p-4 md:grid-cols-8 lg:flex lg:gap-x-4 lg:gap-y-6 lg:px-6">
              {measures.map((measure) => {
                const handleDelete = () => {
                  setMeasures((prev) =>
                    prev.filter((m) => m.id !== measure.id),
                  );
                };
                return (
                  <div
                    key={measure.id}
                    className="flex h-14 w-16 flex-col items-center justify-between rounded-lg border-2  bg-white p-4 shadow-md sm:h-16 sm:w-20 lg:h-24 lg:w-28"
                  >
                    <button
                      className="hidden self-start lg:block"
                      onClick={handleDelete}
                    >
                      x
                    </button>
                    <div className="text-lg sm:text-xl lg:text-2xl">
                      {placeAccidentals(measure.chord.root)}
                      {measure.chord.quality}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex h-min items-center justify-center gap-4 border p-2 text-neutral-800 lg:order-first lg:justify-start lg:gap-8 lg:px-6">
          <div>
            BPM:{" "}
            <input
              type="number"
              value="100"
              className="w-16 rounded-sm border-2 p-1"
            ></input>
          </div>
          <div>
            Key:{" "}
            <input
              type="text"
              value="G"
              className="w-10 rounded-sm border-2 p-1"
            ></input>
          </div>
          <IconMetronome></IconMetronome>
          <IconPlayerSkipBackFilled></IconPlayerSkipBackFilled>
          <IconPlayerPlayFilled></IconPlayerPlayFilled>
          <IconPlayerSkipForwardFilled></IconPlayerSkipForwardFilled>
          <IconVolume></IconVolume>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center justify-between gap-4 border px-1 py-2 lg:order-first lg:w-64 lg:p-8 xl:w-80">
        <div
          id="rootOptionsContainer"
          className="flex flex-col gap-1 lg:flex-row lg:gap-2"
        >
          <div className="flex gap-1 lg:flex-col lg:gap-2">
            {diatonicRootOptions.map((root) => {
              return (
                <button
                  className="size-10 rounded-sm border-2 bg-neutral-300 shadow-md lg:size-12"
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
                  {placeAccidentals(root)}
                </button>
              );
            })}
          </div>
          {/* calculate offset with formula: (sizeOfButton + gap)/2 */}
          <div className="ml-[1.375rem] flex gap-1 lg:order-first lg:ml-0 lg:mt-7 lg:flex-col lg:gap-2">
            {nonDiatonicRootOptionsA.map((root) => {
              return (
                <button
                  className="size-10 rounded-sm border-2 bg-neutral-300 shadow-md lg:size-12"
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
                  {placeAccidentals(root)}
                </button>
              );
            })}
            <div className="size-10 lg:size-12"></div>
            {nonDiatonicRootOptionsB.map((root) => {
              return (
                <button
                  className="size-10 rounded-sm border-2 bg-neutral-300 shadow-md lg:size-12"
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
                  {placeAccidentals(root)}
                </button>
              );
            })}
          </div>
        </div>
        <div id="qualityOptionsContainer" className="flex gap-1 lg:gap-2">
          {qualityOptions.map((quality) => (
            <button
              className={`${qualitySelection === quality ? "bg-neutral-300" : "bg-white"} size-10 rounded-sm border-2 shadow-md lg:size-12`}
              onClick={() => setQualitySelection(quality)}
            >
              {quality}
            </button>
          ))}
        </div>
        <FileOperations></FileOperations>
      </div>
    </main>
  );
}

const FileOperations = () => (
  <div className="hidden w-full flex-col gap-4 text-sm text-neutral-500 lg:flex">
    <button className="flex w-max gap-2">
      <Save />
      <div>Save song</div>
    </button>
    <button className="flex w-max gap-2">
      <FolderOpen></FolderOpen>
      <div>Open song</div>
    </button>
  </div>
);
