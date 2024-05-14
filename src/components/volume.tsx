import { Slider } from "@/components/ui/slider";
import { Volume1, Volume2 } from "lucide-react";

export default function Volume({
  onValueChange,
  volume,
}: {
  onValueChange: (value: number[]) => void;
  volume: number;
}) {
  return (
    <div className="flex w-32 items-center gap-2">
      <Volume1 className="size-10 stroke-stone-600"></Volume1>
      <Slider
        value={[volume]}
        min={0}
        max={1}
        step={0.001}
        onValueChange={onValueChange}
      />
      <Volume2 className="size-10 stroke-stone-600"></Volume2>
    </div>
  );
}
