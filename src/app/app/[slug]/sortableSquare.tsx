import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Square } from "@/app/app/[slug]/square";
import { Measure } from "@/lib/schemas";
import { UniqueIdentifier } from "@dnd-kit/core";
import { placeAccidentals } from "@/lib/utils";

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
  } = useSortable({ id: id });

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
