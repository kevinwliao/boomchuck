"use client";
import { RootSelection } from "./rootSelection";
import { QualitySelection } from "./qualitySelection";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const rootOptions = [
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
] as const;
import { Beat } from "@/lib/types";

// refactor this component and send rootselection and quality selection as children to prevent prop drilling
export default function ChordInput({
  setBeatsArr,
}: {
  setBeatsArr: React.Dispatch<React.SetStateAction<Beat[]>>;
}) {
  return (
    <div className="m-auto my-4 flex max-w-fit flex-wrap gap-4 rounded-xl border border-slate-200 bg-stone-50 p-4">
      <RootSelection></RootSelection>
      <QualitySelection></QualitySelection>
      <Button variant="outline">Add Chord</Button>
      <Button variant={"default"}>Clear All</Button>
    </div>
  );
}
