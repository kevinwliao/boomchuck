import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BeatRectItem } from "./beatRectItem";

export default function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <BeatRectItem
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    ></BeatRectItem>
  );
}