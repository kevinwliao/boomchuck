import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Beat, Chord } from "@/lib/types";
import { Item } from "@/components/item";
import { XMarkIcon } from "@heroicons/react/20/solid";
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
      className={`font-lg group relative select-none rounded-lg border border-slate-200 bg-amber-400 py-4 font-sans text-xl font-bold dark:border-none dark:bg-amber-900 md:py-6 md:text-3xl ${props.active ? "ring-2 ring-amber-200" : ""}`}
      ref={setNodeRef}
      style={style}
    >
      <div
        className={`${props.started ? "hidden" : ""} absolute right-1 top-1 flex items-center text-amber-600`}
      >
        <button
          onClick={closeHandler}
          className="invisible rounded-sm py-1 hover:bg-amber-800/10 focus:visible active:bg-red-600/10 active:text-red-600 group-hover:visible"
        >
          <XIcon className="size-4"></XIcon>
        </button>
        <button
          className="rounded-sm py-1 hover:bg-amber-800/10"
          {...attributes}
          {...listeners}
        >
          <GripVerticalIcon className="size-4"></GripVerticalIcon>
        </button>
      </div>
      <div className="static flex justify-center ">
        <span>{props.beat.chord.root}</span>
        <span>{props.beat.chord.quality}</span>
      </div>
    </div>
  );
}
