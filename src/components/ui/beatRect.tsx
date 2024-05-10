import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// redeclarations

type Chord = {
  root: string;
  quality: string;
};

type Beat = {
  id: number;
  chord: Chord;
};

type beatRectProps = {
  beat: Beat;
  id: number;
  key: number;
  active: boolean;
};

export function BeatRect(props: beatRectProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={`font-lg rounded-lg border border-slate-200 bg-stone-300 p-2 font-mono text-xl font-bold ${props.active ? "ring-2 ring-amber-200" : ""}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <span className="flex justify-center ">
        <span>{props.beat.chord.root}</span>
        <span>{props.beat.chord.quality}</span>
      </span>
      {/* ... */}
    </div>
  );
}
