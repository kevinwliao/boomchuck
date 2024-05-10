import { Slider } from "./slider";
import { Volume1, Volume2 } from "lucide-react";

export default function Volume() {
  return (
    <div className="flex w-32 items-center gap-2">
      <Volume1 className="size-10 stroke-stone-600"></Volume1>
      <Slider defaultValue={[1800]} max={2000} step={1} />
      <Volume2 className="size-10 stroke-stone-600"></Volume2>
    </div>
  );
}
