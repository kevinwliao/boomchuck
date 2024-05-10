import React from "react";
import { Input } from "@/components/ui/input";

export default function Bpm({
  onChange,
  bpm,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  bpm: number;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-md text-stone-400">BPM</div>
      <Input
        className="h-max w-max text-2xl"
        type="number"
        id="bpm"
        name="bpm"
        min="80"
        max="200"
        value={bpm}
        onChange={onChange}
      ></Input>
    </div>
  );
}
