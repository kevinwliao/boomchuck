import { Measure } from "@/lib/schemas";
import React from "react";
import Square from "@/app/app/[slug]/square";

type Props = {
  measures: Measure[];
  setMeasures: React.Dispatch<React.SetStateAction<Measure[]>>;
};

export default function Measures({ measures, setMeasures }: Props) {
  return (
    <div id="chords">
      <div className="grid grid-cols-4 flex-wrap gap-x-2 gap-y-4 p-4 md:grid-cols-8 lg:flex lg:gap-x-4 lg:gap-y-6 lg:px-6">
        {measures.map((measure, index) => {
          const handleDelete = () => {
            console.log("click");
            setMeasures((prev) => prev.filter((m) => m.id !== measure.id));
          };
          return (
            <Square
              measure={measure}
              handleDelete={handleDelete}
              id={measure.id}
            ></Square>
          );
        })}
      </div>
    </div>
  );
}
