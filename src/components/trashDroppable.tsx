import React from "react";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { IconTrash } from "@tabler/icons-react";

type Props = { id: UniqueIdentifier };

export default function TrashDroppable({ id }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      id={"trash"}
      key={"trash"}
      className={`h-32 w-64 bg-red-500/10 ${isOver && "bg-red-500/40"} absolute bottom-4 left-0 right-0 ml-auto mr-auto flex flex-col items-center justify-center rounded-md border border-dashed border-red-800 text-red-800`}
    >
      <IconTrash></IconTrash>
      <div>Delete Measure</div>
    </div>
  );
}
