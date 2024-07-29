import React from "react";
// import { Input } from "@/components/ui/input";

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
    <div className="flex w-full max-w-full items-center justify-center gap-0 sm:gap-2">
      <label
        htmlFor="bpm"
        className="hidden text-xs text-muted-foreground sm:text-sm md:inline"
      >
        BPM
      </label>
      <input
        className="h-max w-max max-w-full shrink rounded-md border px-2 py-1"
        type="number"
        id="bpm"
        name="bpm"
        min="60"
        max="200"
        value={bpm}
        onChange={onChange}
        disabled={disabled}
      ></input>
    </div>
  );
}
