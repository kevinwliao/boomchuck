import React from "react";
import { IconX, IconGripVertical } from "@tabler/icons-react";
import { placeAccidentals } from "@/lib/utils";
import { Measure } from "@/lib/schemas";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = { handleDelete: () => void; measure: Measure; id: string };

export default function Square({ handleDelete, measure, id }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      key={measure.id}
      className="group relative flex h-14 w-16 flex-col items-center justify-end overflow-clip rounded-md border bg-white p-2 shadow-md sm:h-16 sm:w-20 lg:h-24 lg:w-28 lg:justify-between"
    >
      <div className="hidden w-full justify-between lg:flex">
        <button
          className="text-stone-500 hover:text-red-500 active:text-red-700"
          onClick={handleDelete}
        >
          <IconX className="size-4" />
        </button>
        <button
          className="cursor-grab text-stone-400 active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <IconGripVertical className="size-4 lg:size-6" />
        </button>
      </div>
      <div className="text-lg group-last:text-amber-950 sm:text-xl lg:text-3xl">
        {placeAccidentals(measure.chord.root)}
        {measure.chord.quality}
      </div>
    </div>
  );
}
