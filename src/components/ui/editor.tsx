import React, { DragEventHandler, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BeatRect } from "./beatRect";
import { Chord, Beat } from "@/lib/types";

// const initBeatsArrDnd: Beat[] = [
//   { id: 1, chord: { root: "G", quality: "M" } },
//   { id: 2, chord: { root: "G", quality: "M" } },
//   { id: 3, chord: { root: "G", quality: "M" } },
//   { id: 4, chord: { root: "E", quality: "m" } },
//   { id: 5, chord: { root: "C", quality: "M" } },
//   { id: 7, chord: { root: "C", quality: "M" } },
//   { id: 8, chord: { root: "E", quality: "m" } },
//   { id: 9, chord: { root: "E", quality: "m" } },
//   { id: 10, chord: { root: "G", quality: "M" } },
//   { id: 11, chord: { root: "G", quality: "M" } },
//   { id: 12, chord: { root: "G", quality: "M" } },
//   { id: 13, chord: { root: "E", quality: "m" } },
//   { id: 14, chord: { root: "C", quality: "M" } },
//   { id: 15, chord: { root: "C", quality: "M" } },
//   { id: 16, chord: { root: "E", quality: "m" } },
//   { id: 17, chord: { root: "E", quality: "m" } },
//   { id: 18, chord: { root: "D", quality: "M" } },
//   { id: 19, chord: { root: "D", quality: "M" } },
// ];

export default function Editor({
  beatsArr,
  setBeatsArr,
  activeIndex,
}: {
  beatsArr: Beat[];
  setBeatsArr: React.Dispatch<React.SetStateAction<Beat[]>>;
  activeIndex: number;
}) {
  //const [beatsArr, setBeatsArr] = useState(initBeatsArrDnd);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="m-auto grid w-full grid-cols-4 gap-2 sm:w-10/12 lg:w-8/12 lg:grid-cols-8">
        <SortableContext items={beatsArr}>
          {beatsArr.map((beat, index) => (
            <BeatRect
              key={beat.id}
              id={beat.id}
              beat={beat}
              active={index === activeIndex}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );

  function getBeatPos(id: UniqueIdentifier) {
    return beatsArr.findIndex((beat) => beat.id === id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setBeatsArr((prevBeatsArr) => {
        const oldIndex = getBeatPos(active.id);
        const newIndex = getBeatPos(over?.id!);

        return arrayMove(prevBeatsArr, oldIndex, newIndex);
      });
    }
  }
}
