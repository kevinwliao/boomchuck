import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Beat, Chord } from "@/lib/types";
import { GripVerticalIcon } from "lucide-react";
import { XIcon } from "lucide-react";

type beatRectProps = {
  beat: Beat;
  id: number | string;
  key: number | string;
  active: boolean;
  started: boolean;
  setBeatsArr: React.Dispatch<React.SetStateAction<Beat[]>>;
};

export function BeatRect(props: beatRectProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const closeHandler = () => {
    console.log(props.id);
    props.setBeatsArr((prevBeatsArr) =>
      prevBeatsArr.filter((beat) => beat.id !== props.id),
    );
  };

  return (
    <div
      className={`group relative box-border select-none rounded-lg  border bg-boomchuck py-4 font-sans text-lg font-semibold md:py-6 md:text-3xl ${props.active ? "ring-4 ring-amber-800/80 dark:ring-amber-200/80" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <div
        className={`${props.started ? "hidden" : ""} absolute right-1 top-1 flex items-center text-amber-600`}
      >
        <button
          onClick={closeHandler}
          className="invisible rounded-sm py-1 hover:bg-amber-700/20 focus:visible active:bg-red-600/10 active:text-red-600 group-hover:visible dark:hover:bg-amber-500/20"
        >
          <XIcon className="size-3 md:size-4"></XIcon>
        </button>
        <button
          className="rounded-sm py-1 hover:bg-amber-700/20 dark:hover:bg-amber-500/20"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="size-3 md:size-4"></GripVerticalIcon>
        </button>
      </div>
      <div className="static flex justify-center ">
        <span>{props.beat.chord.root}</span>
        <span>{props.beat.chord.quality}</span>
      </div>
    </div>
  );
}
