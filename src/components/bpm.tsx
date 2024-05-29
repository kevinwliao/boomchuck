import React from "react";
import { Input } from "@/components/ui/input";

import { Slider } from "@/components/ui/slider";
export default function Bpm({
  onChange,
  onValueChange,
  bpm,
  disabled,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onValueChange: (value: number[]) => void;
  bpm: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-start gap-1 sm:gap-2">
      <div className="shrink text-xs text-muted-foreground sm:text-sm">BPM</div>
      <Input
        className="h-max w-max shrink text-lg sm:text-2xl"
        type="number"
        id="bpm"
        name="bpm"
        min="0"
        max="200"
        value={bpm}
        onChange={onChange}
        disabled={disabled}
      ></Input>
    </div>

    // <div className="flex w-32 items-center gap-4">
    //   <Slider
    //     value={[bpm]}
    //     onValueChange={onValueChange}
    //     min={80}
    //     max={200}
    //     disabled={disabled}
    //   ></Slider>
    //   <div className="text-md">
    //     <span>{bpm}</span> <span className="text-sm text-slate-400">BPM</span>
    //   </div>
    // </div>
  );
}
