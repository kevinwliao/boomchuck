export default function Key({
  onChange,
  bpm,
  disabled,
}: {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  bpm: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <label
        htmlFor="bpm"
        className="hidden text-xs text-muted-foreground sm:text-sm md:inline"
      >
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
