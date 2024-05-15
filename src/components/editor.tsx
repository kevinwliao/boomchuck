import React, { DragEventHandler, useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
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
import { Item } from "@radix-ui/react-navigation-menu";

export default function Editor({
  beatsArr,
  setBeatsArr,
  activeIndex,
}: {
  beatsArr: Beat[];
  setBeatsArr: React.Dispatch<React.SetStateAction<Beat[]>>;
  activeIndex: number;
}) {
  const [activeId, setActiveId] = useState(null);
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
              setBeatsArr={setBeatsArr}
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
