import React from "react";
import {
  useSortable,
  defaultAnimateLayoutChanges,
  UseSortableArguments,
  AnimateLayoutChanges,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Square } from "@/app/app/[slug]/square";
import { Measure } from "@/lib/schemas";
import { UniqueIdentifier } from "@dnd-kit/core";
import { placeAccidentals } from "@/lib/utils";
import { SortableTransition } from "@dnd-kit/sortable/dist/hooks/types";

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({
    ...args,
    wasDragging: true,
  });

export function SortableItem({
  id,
  measure,
  handleDelete,
}: {
  id: string;
  measure: Measure;
  handleDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ animateLayoutChanges, id: id });

  console.log(animateLayoutChanges);

  const style = {
    opacity: isDragging ? "0.5" : "1",
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Square
      id={id}
      handleDelete={handleDelete}
      ref={setNodeRef}
      style={style}
      attributes={attributes}
      listeners={listeners}
    >
      {placeAccidentals(measure.chord.root)}
      {measure.chord.quality}
    </Square>
  );
}
