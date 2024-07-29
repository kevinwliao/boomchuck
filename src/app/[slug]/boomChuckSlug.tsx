"use client";
import { createSong } from "@/lib/actions";
import Volume from "@/components/volume";
import { Measure, Quality, Song, measureSchema } from "@/lib/schemas";
import {
  diatonicRootOptions,
  nonDiatonicRootOptionsA,
  nonDiatonicRootOptionsB,
  qualityOptions,
} from "@/lib/schemas";
import { Play, SkipBack, SkipForward, GripVertical } from "lucide-react";
import {
  IconPlayerStopFilled,
  IconPlayerPlayFilled,
  IconRepeat,
  IconSquareXFilled,
  IconGripVertical,
  IconVolume,
  IconMetronome,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconX,
  IconGripHorizontal,
} from "@tabler/icons-react";
import { FolderOpen, Save } from "lucide-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { QualitySelection } from "@/components/qualitySelection";

const sharp = "\u266f";
const flat = "\u266d";
const placeAccidentals = (str: string) => <>{str.replace("#", sharp)}</>;

export default function BoomChuck({ song }: { song: Song }) {
  const [measures, setMeasures] = useState(song.measures);
  const [volume, setVolume] = useState(0.75);
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
    <main className="flex grow flex-col bg-stone-200 lg:flex-row">
      <div className="flex grow flex-col">
        <div className="flex grow basis-0 justify-center overflow-scroll border-none lg:justify-normal">
          <div id="chords">
            <div className="grid grid-cols-4 flex-wrap gap-x-2 gap-y-4 p-4 md:grid-cols-8 lg:flex lg:gap-x-4 lg:gap-y-6 lg:px-6">
              {measures.map((measure, index) => {
                const handleDelete = () => {
                  setMeasures((prev) =>
                    prev.filter((m) => m.id !== measure.id),
                  );
                };
                return (
                  <div
                    key={measure.id}
                    className="group relative flex h-14 w-16 flex-col items-center justify-end overflow-clip rounded-lg border bg-white p-2 shadow-md last:border-amber-600 last:bg-amber-200 sm:h-16 sm:w-20 lg:h-24 lg:w-28 lg:justify-between"
                  >
                    <div className="hidden  w-full justify-between lg:flex">
                      {/* <div className="invisible text-sm text-stone-400 group-last:text-amber-600 group-odd:visible">
                        {index + 1}
                      </div> */}
                      <button
                        className="invisible text-stone-500 hover:text-red-500  active:text-red-700 group-hover:visible"
                        onClick={handleDelete}
                      >
                        <IconX className="size-4" />
                      </button>
                      <button className="cursor-grab text-stone-400  active:cursor-grabbing group-last:text-amber-600 ">
                        <IconGripVertical className="size-4 lg:size-6" />
                      </button>
                    </div>
                    <div className="text-lg group-last:text-amber-950 sm:text-xl  lg:text-3xl">
                      {placeAccidentals(measure.chord.root)}
                      {measure.chord.quality}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex h-min items-center justify-center gap-4 border-b border-t p-2 lg:order-first lg:justify-start lg:gap-6 lg:border-t-0 lg:px-6">
          <div className="hidden md:block">
            BPM:{" "}
            <input
              type="number"
              value="100"
              className="w-16 rounded-sm border p-1"
            ></input>
          </div>
          <div className="hidden md:block">
            Key:{" "}
            <input
              type="text"
              value="G"
              className="w-10 rounded-sm border p-1"
            ></input>
          </div>
          <button
            className=" text-stone-700 hover:text-stone-500 active:text-stone-950"
            type="button"
            aria-label="back"
            title="Back (,)"
          >
            <IconPlayerSkipBackFilled />
          </button>
          <button
            className="text-stone-700 hover:text-stone-500 active:text-stone-950"
            type="button"
            aria-label="play"
            title="Play (_)"
          >
            <IconPlayerPlayFilled />
          </button>
          <button
            className="text-stone-700 hover:text-stone-500 active:text-stone-950"
            type="button"
            aria-label=""
            title="Forward (.)"
          >
            <IconPlayerSkipForwardFilled />
          </button>
          <Volume
            volume={volume}
            onValueChange={([value]) => {
              setVolume(value);
            }}
          ></Volume>
          <div>{volume}</div>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-center justify-between gap-4 px-1 py-2 md:py-4 lg:order-first lg:w-64 lg:border-r lg:px-10 lg:py-12 xl:w-80">
        <div className="chordSelectionContainer base flex grow flex-col items-center justify-center gap-4 lg:gap-8 lg:text-lg xl:gap-16">
          <div
            id="rootOptionsContainer"
            className="flex flex-col justify-center gap-1 lg:flex-row lg:gap-2"
          >
            <div className="flex gap-1 lg:flex-col lg:gap-2">
              {diatonicRootOptions.map((root) => {
                return (
                  <button
                    className="size-10 rounded-md border bg-stone-300 lg:size-12"
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
            {/* calculate offset with formula: (sizeOfBox + gap)/2 */}
            <div className="ml-[1.375rem] flex gap-1 lg:order-first lg:ml-0 lg:mt-7 lg:flex-col lg:gap-2">
              {nonDiatonicRootOptionsA.map((root) => {
                return (
                  <button
                    className="size-10 rounded-md border bg-stone-300 lg:size-12"
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
                    className="size-10 rounded-md  border bg-stone-300 lg:size-12"
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
          <QualitySelection
            qualitySelection={qualitySelection}
            onValueChange={(value) => {
              console.log("hi");
              setQualitySelection(value);
            }}
          ></QualitySelection>
        </div>
        <FileOperations></FileOperations>
      </div>
    </main>
  );
}

const FileOperations = () => (
  <div className="hidden w-full flex-col gap-4 text-sm text-stone-500 lg:flex">
    <button className="flex w-max items-center gap-2 uppercase">
      <Save />
      <div>Save song</div>
    </button>
    <button className="flex w-max items-center gap-2 uppercase">
      <FolderOpen></FolderOpen>
      <div>Open song</div>
    </button>
  </div>
);
