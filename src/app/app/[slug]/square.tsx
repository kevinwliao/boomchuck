import React, { ReactNode, useEffect } from "react";
import { IconX, IconGripVertical } from "@tabler/icons-react";

type SquareProps = {
  handleDelete: () => void;
  overlay: boolean;
  id: UniqueIdentifier;
  children: ReactNode;
  style?: {
    transform: string | undefined;
    transition: string | undefined;
  };
  listeners?: SyntheticListenerMap | undefined;
  attributes?: DraggableAttributes;
  isCurrentMeasure: boolean;
  playing: boolean;
  isDragging: boolean;
  index?: number;
};

import { forwardRef } from "react";
import { DraggableAttributes, UniqueIdentifier } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export const Square = forwardRef<HTMLDivElement, SquareProps>(
  (
    {
      id,
      handleDelete,
      children,
      style,
      listeners,
      overlay,
      attributes,
      isCurrentMeasure,
      playing,
      isDragging,
      index,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={style}
        className={`${isCurrentMeasure && !isDragging ? "border-amber-700 bg-amber-200 text-amber-950" : "bg-white"} _sm:w-20 group relative flex h-16 w-full flex-col items-center justify-between overflow-clip rounded-md border p-1 sm:h-20 sm:p-2 lg:h-24 lg:w-28`}
      >
        <div
          className={`flex w-full justify-between ${isCurrentMeasure && !isDragging ? "text-amber-700" : "text-stone-500"}`}
        >
          <button
            disabled={playing}
            className={`${playing && ""} hover:text-red-500 active:text-red-700 disabled:pointer-events-none disabled:opacity-50`}
            onClick={handleDelete}
          >
            <IconX className="size-4" />
          </button>
          <button
            id="drag-handle"
            disabled={playing}
            {...listeners}
            // {...attributes}
            // this approximates active cursor grabbing styling but is not exact
            className={`cursor-move rounded-md ${playing && ""} ${overlay && "bg-stone-200 hover:cursor-move"} disabled:pointer-events-none disabled:opacity-50`}
          >
            <IconGripVertical className="size-4 lg:size-6" />
          </button>
        </div>
        <div className="text-lg group-last:text-amber-950 sm:text-xl lg:text-3xl">
          {children}
          {/* {placeAccidentals(measure.chord.root)}
          {measure.chord.quality} */}
        </div>
      </div>
    );
  },
);
