import React from "react";

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
    <div className="hidden w-28 items-center justify-end gap-2 sm:flex">
      <label htmlFor="bpm" className="text-xs text-muted-foreground sm:text-sm">
        BPM
      </label>
      <input
        className="h-max w-max rounded-md border px-2 py-1"
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
