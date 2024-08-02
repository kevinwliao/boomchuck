import React, { ReactNode } from "react";
import { IconX, IconGripVertical } from "@tabler/icons-react";

type SquareProps = {
  handleDelete: () => void;
  id: UniqueIdentifier;
  children: ReactNode;
  style?: {
    transform: string | undefined;
    transition: string | undefined;
  };
  listeners?: SyntheticListenerMap | undefined;
  attributes?: DraggableAttributes;
};

import { forwardRef } from "react";
import { DraggableAttributes, UniqueIdentifier } from "@dnd-kit/core";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export const Square = forwardRef<HTMLDivElement, SquareProps>(
  (
    { id, handleDelete, children, style, listeners, attributes, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        style={style}
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
            {...listeners}
            // {...attributes}
            className="cursor-grab text-stone-400 active:cursor-grabbing"
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
