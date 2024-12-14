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
  IconPlayerPauseFilled,
  IconLoader2,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { QualitySelection } from "@/components/qualitySelection";
import Bpm from "@/components/bpm";
import SaveSongDialog from "@/app/form/saveSongDialog";
import OpenSongDialog from "@/app/form/openSongDialog";
import {
  DndContext,
  closestCenter,
  useDndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
  DragStartEvent,
  Active,
  DragOverlay,
  MeasuringStrategy,
  DragCancelEvent,
  defaultDropAnimationSideEffects,
  defaultDropAnimation,
  closestCorners,
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
import { Square } from "@/app/app/[slug]/square";
import ClearSongDialog from "@/app/form/clearSongDialog";
import { MeasuringConfiguration } from "@dnd-kit/core";
import TrashDroppable from "@/components/trashDroppable";
import { SignInButton } from "@/components/signInButton";
import { useIsClient, useLocalStorage } from "usehooks-ts";
import { useParams } from "next/navigation";
import RevertChangesDialog from "@/app/form/revertChangesDialog";
import { Session } from "next-auth";
import SkeletonMeasures from "@/app/app/[slug]/skeletonMeasures";
import useAudio from "@/app/app/[slug]/useAudio";
import * as Tone from "tone";
import { Metadata } from "next";
import { useToast } from "@/components/ui/use-toast";

const measuringConfig: MeasuringConfiguration = {
  droppable: {
    strategy: MeasuringStrategy.Always,
  },
};

export const metadata: Metadata = {
  title: "Invoices",
};

export default function BoomChuck({
  song,
  songs,
  session,
}: {
  song?: Song;
  songs: Song[];
  session: Session | null;
}) {
  const { toast } = useToast();
  const params = useParams();
  const isClient = useIsClient();
  const [measures, setMeasures] = useLocalStorage(
    params.slug ? params.slug[0] : "new-song",
    song ? song.measures : [],
  );

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [volume, setVolume] = useState(0.75);
  const [playing, setPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [bpm, setBpm] = useState(120);
  const [loopOn, setLoopOn] = useState(false);
  const [qualitySelection, setQualitySelection] = useState<Quality>("M");

  const activeMeasure = measures.find((m) => m.id === activeId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { bassLoaded, guitarLoaded, volumeRef } = useAudio(
    bpm,
    volume,
    measures,
    loopOn,
    setPlaying,
    setCurrentIndex,
  );
  useEffect(() => {
    Tone.getTransport().bpm.rampTo(bpm * 2, 0.01);
  }, [bpm]);
  useEffect(() => {
    if (volumeRef.current)
      volumeRef.current.volume.linearRampTo(
        // formula for mapping linear scale to decibels
        Math.log10(volume) * 20,
        0.01,
      );
  });
  useEffect(() => {
    if (playing) {
      Tone.getTransport().start("+0.1");
    } else {
      Tone.getTransport().pause();
    }
  }, [playing]);

  return (
    <main className="flex grow flex-col bg-stone-200 lg:flex-row">
      <div className="flex grow flex-col">
        <div className="relative flex grow basis-0 justify-center overflow-scroll border-none lg:justify-normal">
          <DndContext
            measuring={measuringConfig}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragCancel={handleDragCancel}
            modifiers={[restrictToFirstScrollableAncestor]}
          >
            <SortableContext items={measures.map((m) => m.id)}>
              {isClient ? (
                <Measures
                  currentIndex={currentIndex}
                  playing={playing}
                  measures={measures}
                  setMeasures={setMeasures}
                ></Measures>
              ) : (
                <SkeletonMeasures></SkeletonMeasures>
              )}
              {/* <TrashDroppable id="trash"></TrashDroppable> */}
            </SortableContext>
            <DragOverlay
              className="drop-shadow-xl"
              dropAnimation={{
                ...defaultDropAnimation,
                sideEffects: defaultDropAnimationSideEffects({
                  styles: {
                    active: {
                      opacity: "0.5",
                    },
                  },
                }),
              }}
            >
              {activeId ? (
                <Square
                  isDragging={false}
                  id={activeId}
                  handleDelete={() => {}}
                  overlay
                  playing={false}
                  isCurrentMeasure={false}
                >
                  {placeAccidentals(activeMeasure?.chord.root)}
                  {activeMeasure?.chord.quality}
                </Square>
              ) : null}
            </DragOverlay>
            <LayoutComponent></LayoutComponent>
          </DndContext>
        </div>
        <div
          id="audioBar"
          className="flex h-min items-center justify-center gap-4 border-b border-t p-2 lg:order-first lg:justify-start lg:gap-6 lg:border-t-0 lg:px-6"
        >
          <Bpm
            disabled={false}
            bpm={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
          ></Bpm>
          <button
            className="text-stone-700 hover:text-stone-800"
            type="button"
            aria-label="back"
            title="Back (,)"
            disabled={!(bassLoaded && guitarLoaded)}
            onClick={() => {
              Tone.getTransport().pause();
              Tone.getTransport().position = "0:0:0";
              setPlaying(false);
              setCurrentIndex(-1);
            }}
          >
            <IconPlayerStopFilled />
          </button>
          <button
            className="text-stone-700 hover:text-stone-800"
            type="button"
            aria-label="play"
            title="Play (_)"
            onClick={() => setPlaying((prev) => !prev)}
          >
            {!playing ? <IconPlayerPlayFilled /> : <IconPlayerPauseFilled />}
          </button>
          <button
            className={`${loopOn ? "text-green-500 hover:text-green-600" : "text-stone-700 hover:text-stone-800"} `}
            onClick={() => setLoopOn((prev) => !prev)}
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
        className="flex w-full shrink-0 flex-col items-center justify-between gap-8 px-1 py-2 md:py-4 lg:order-first lg:w-64 lg:border-r lg:px-10 lg:py-8 xl:w-80"
      >
        <div className="chordSelectionContainer base flex shrink-0 grow flex-col items-center justify-center gap-4 lg:gap-10 lg:text-lg xl:gap-10">
          <div
            id="rootOptionsContainer"
            className="flex flex-col justify-center gap-1 lg:flex-row lg:gap-2"
          >
            <div className="flex gap-1 lg:flex-col lg:gap-2">
              {diatonicRootOptions.map((root) => {
                return (
                  <button
                    key={root}
                    className="size-10 rounded-md border-none bg-stone-300 transition-colors hover:bg-stone-300/80 active:bg-stone-300 lg:size-12"
                    onClick={() => {
                      if (measures.length < 64) {
                        setMeasures((prev) => [
                          ...prev,
                          {
                            id: uuid(),
                            chord: { root: root, quality: qualitySelection },
                          },
                        ]);
                      } else {
                        toast({
                          variant: "destructive",
                          title: `Failed to add chord:`,
                          description:
                            "Maximum song size reached (64 measures)",
                        });
                      }
                    }}
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
                    key={root}
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
                    key={root}
                    className="size-10 rounded-md border-none bg-stone-300 transition-colors hover:bg-stone-300/80 active:bg-stone-300 lg:size-12"
                    onClick={() => {
                      if (measures.length < 64) {
                        setMeasures((prev) => [
                          ...prev,
                          {
                            id: uuid(),
                            chord: { root: root, quality: qualitySelection },
                          },
                        ]);
                      } else {
                        toast({
                          variant: "destructive",
                          title: `Failed to add chord:`,
                          description:
                            "Maximum song size reached (64 measures)",
                        });
                      }
                    }}
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
        <hr className="hidden w-full border-border lg:block" />
        <div
          id="file-management"
          className="items-between hidden grow flex-col gap-2 lg:flex"
        >
          <OpenSongDialog songs={songs}></OpenSongDialog>
          <SaveSongDialog
            session={session}
            measures={measures}
            name={song?.name}
          ></SaveSongDialog>
          <ClearSongDialog
            clearMeasures={() => setMeasures([])}
          ></ClearSongDialog>
          <RevertChangesDialog
            revertChanges={() => setMeasures(song ? song.measures : [])}
          ></RevertChangesDialog>
        </div>
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

  function handleDragCancel(event: DragCancelEvent) {
    const { active, over } = event;

    setActiveId(null);
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
    if (over?.id === "trash") {
      setMeasures((prev) => prev.filter((m) => m.id !== active.id));
    }
    setActiveId(null);
  }
}

// empty component to consume context for layout resizing
const LayoutComponent = () => {
  const { measureDroppableContainers } = useDndContext();
  useEffect(() => {
    function handleResize() {
      //@ts-ignore Bad Function Declaration
      measureDroppableContainers();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [measureDroppableContainers]);
  return <></>;
};
