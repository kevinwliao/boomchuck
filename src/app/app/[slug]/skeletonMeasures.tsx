import { Measure } from "@/lib/schemas";
import React from "react";
import { SortableItem } from "@/app/app/[slug]/sortableSquare";
import Music from "/public/music.svg";

export default function SkeletonMeasures() {
  return (
    <div id="chords" className="grow">
      <div className="grid grid-cols-4 flex-wrap gap-x-2 gap-y-4 px-2 py-4 sm:grid-cols-8 lg:flex lg:gap-x-4 lg:gap-y-6 lg:px-6">
        {[...Array(16)].map((e, i) => {
          return (
            <div
              className={`_sm:w-20 group relative flex h-16 w-full animate-pulse flex-col items-center justify-between overflow-clip rounded-md bg-stone-300 p-1 sm:h-20 sm:p-2 lg:h-24 lg:w-28`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
