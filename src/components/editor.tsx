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
  DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToFirstScrollableAncestor,
  restrictToHorizontalAxis,
  restrictToParentElement,
  restrictToWindowEdges,
} from "@dnd-kit/modifiers";
import { BeatRect } from "./beatRect";
import { Chord, Beat } from "@/lib/types";

export default function Editor({
  beatsArr,
  setBeatsArr,
  started,
  activeIndex,
}: {
  beatsArr: Beat[];
  setBeatsArr: React.Dispatch<React.SetStateAction<Beat[]>>;
  started: boolean;
  activeIndex: number;
}) {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      id={"id"}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div className="m-auto grid w-full grid-cols-4 gap-2  p-4 sm:w-10/12 lg:w-8/12 lg:grid-cols-8">
        <SortableContext items={beatsArr}>
          {beatsArr.map((beat, index) => (
            <BeatRect
              started={started}
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

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    setActiveId(active.id);
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
