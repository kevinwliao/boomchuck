"use client";
import Volume from "@/components/volume";
import { Measure, Quality, Song } from "@/lib/schemas";
import {
  diatonicRootOptions,
  nonDiatonicRootOptionsA,
  nonDiatonicRootOptionsB,
} from "@/lib/schemas";
import {
  IconPlayerStopFilled,
  IconPlayerPlayFilled,
  IconRepeat,
} from "@tabler/icons-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { QualitySelection } from "@/components/qualitySelection";
import Bpm from "@/components/bpm";
import SaveSongDialog from "@/app/form/saveSongDialog";
import OpenSongDialog from "@/app/form/openSongDialog";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
  DragStartEvent,
  Active,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  rectSwappingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { placeAccidentals } from "@/lib/utils";
import Measures from "@/app/app/[slug]/measures";
import {
  restrictToFirstScrollableAncestor,
  restrictToParentElement,
} from "@dnd-kit/modifiers";

export default function BoomChuck({
  song,
  songs,
}: {
  song?: Song;
  songs: Song[];
}) {
  const [measures, setMeasures] = useState<Measure[]>(() =>
    song ? song.measures : [],
  );
  const [active, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [volume, setVolume] = useState(0.75);
  const [bpm, setBpm] = useState(120);
  const [loopOn, setLoopOn] = useState(false);
  const [qualitySelection, setQualitySelection] = useState<Quality>("M");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <main className="flex grow flex-col bg-stone-200 lg:flex-row">
      <div className="flex grow flex-col">
        <div className="flex grow basis-0 justify-center overflow-scroll border-none lg:justify-normal">
          <DndContext
            id={"id"}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToFirstScrollableAncestor]}
          >
            <SortableContext items={measures.map((m) => m.id)}>
              <Measures
                measures={measures}
                setMeasures={setMeasures}
              ></Measures>
            </SortableContext>
          </DndContext>
        </div>
        <div
          id="audioBar"
          className="flex h-min items-center justify-center gap-4 border-b border-t p-2 lg:order-first lg:justify-start lg:gap-6 lg:border-t-0 lg:px-6"
        >
          <div className="hidden md:block">
            <Bpm
              disabled={false}
              bpm={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
            ></Bpm>
          </div>
          <button
            className="text-stone-700 hover:text-stone-500 active:text-stone-950"
            type="button"
            aria-label="back"
            title="Back (,)"
          >
            <IconPlayerStopFilled />
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
            className="text-green-600 hover:text-stone-500 active:text-stone-950"
            type="button"
            aria-label="back"
            title="Back (,)"
          >
            <IconRepeat />
          </button>
          <Volume
            volume={volume}
            onValueChange={([value]) => {
              setVolume(value);
            }}
          ></Volume>
        </div>
      </div>
      <div
        id="chordSelectionAndFileContainer"
        className="flex w-full shrink-0 flex-col items-center justify-between gap-4 px-1 py-2 md:py-4 lg:order-first lg:w-64 lg:border-r lg:px-10 lg:py-12 xl:w-80"
      >
        <div className="chordSelectionContainer base flex grow flex-col items-center justify-center gap-4 lg:gap-16 lg:text-lg xl:gap-16">
          <div
            id="rootOptionsContainer"
            className="flex flex-col justify-center gap-1 lg:flex-row lg:gap-2"
          >
            <div className="flex gap-1 lg:flex-col lg:gap-2">
              {diatonicRootOptions.map((root) => {
                return (
                  <button
                    className="size-10 rounded-md border-none bg-stone-300 transition-colors hover:bg-stone-300/80 active:bg-stone-300 lg:size-12"
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
                    className="size-10 rounded-md border-none bg-stone-300 transition-colors hover:bg-stone-300/80 active:bg-stone-300 lg:size-12"
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
                    className="size-10 rounded-md border-none bg-stone-300 transition-colors hover:bg-stone-300/80 active:bg-stone-300 lg:size-12"
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
              if (value) {
                setQualitySelection(value);
              }
            }}
          ></QualitySelection>
        </div>
        <OpenSongDialog songs={songs}></OpenSongDialog>
        <SaveSongDialog measures={measures}></SaveSongDialog>
      </div>
    </main>
  );

  function getBeatPos(id: UniqueIdentifier) {
    return measures.findIndex((measure) => measure.id === id);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setMeasures((prev) => {
        const oldIndex = getBeatPos(active.id);
        const newIndex = getBeatPos(over?.id!);

        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }
}
