import React from "react";
import { Input } from "@/components/ui/input";

export default function Bpm({
  onChange,
  bpm,
  disabled,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  bpm: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex max-w-full items-center justify-start gap-1 sm:gap-2">
      <div className="shrink text-xs text-muted-foreground sm:text-sm">BPM</div>
      <Input
        className=" h-max w-max max-w-full shrink text-2xl"
        type="number"
        id="bpm"
        name="bpm"
        min="60"
        max="200"
        value={bpm}
        onChange={onChange}
        disabled={disabled}
      ></Input>
    </div>
  );
}
