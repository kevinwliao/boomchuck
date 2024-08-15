import { Measure } from "@/lib/schemas";
import React from "react";
import { SortableItem } from "@/app/app/[slug]/sortableSquare";
import Music from "/public/music.svg";

type Props = {
  measures: Measure[];
  setMeasures: React.Dispatch<React.SetStateAction<Measure[]>>;
  currentIndex: number;
  playing: boolean;
};

export default function Measures({
  measures,
  setMeasures,
  currentIndex,
  playing,
}: Props) {
  return (
    <div id="chords" className="grow">
      <div className="grid grid-cols-4 flex-wrap gap-x-2 gap-y-4 px-2 py-4 sm:grid-cols-8 lg:flex lg:gap-x-4 lg:gap-y-6 lg:px-6">
        {measures.map((measure, index) => {
          const handleDelete = () => {
            console.log("click");
            setMeasures((prev) => prev.filter((m) => m.id !== measure.id));
          };
          return (
            <SortableItem
              isCurrentMeasure={currentIndex === index}
              playing={playing}
              measure={measure}
              handleDelete={handleDelete}
              id={measure.id}
              key={measure.id}
              index={index}
            ></SortableItem>
          );
        })}
      </div>
    </div>
  );
}
