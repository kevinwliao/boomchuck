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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Beat } from "@/lib/types";
import { Chord } from "@/lib/types";

const qualityOptions = ["M", "m", "7"] as const;
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

const initialPalette = [
  { root: "G", quality: "M" },
  { root: "C", quality: "M" },
  { root: "D", quality: "M" },
];

export default function ChordInput({
  setBeatsArr,
}: {
  setBeatsArr: React.Dispatch<React.SetStateAction<Beat[]>>;
}) {
  const [open, setOpen] = useState(false);
  const [selectedRoot, setSelectedRoot] = useState<
    (typeof rootOptions)[number] | null
  >(rootOptions[0]);
  const [selectedQuality, setSelectedQuality] = useState<
    (typeof qualityOptions)[number] | null
  >(qualityOptions[0]);

  const chordSelected = selectedRoot && selectedQuality;

  const [palette, setPalette] = useState<Chord[]>(initialPalette);

  const addChord = () => {
    if (chordSelected) {
      setBeatsArr((prevBeatsArr) => [
        ...prevBeatsArr,
        {
          id: uuidv4(),
          chord: { root: selectedRoot, quality: selectedQuality },
        },
      ]);
    }
  };

  const addChordToPalette = () => {
    if (chordSelected) {
      setPalette([
        ...palette,
        { root: selectedRoot, quality: selectedQuality },
      ]);
    }
  };

  return (
    <>
      <div className="m-auto mb-2 mt-2 flex max-w-fit flex-wrap gap-4 rounded-xl border border-slate-200 bg-stone-50 p-4">
        <div className="flex items-center space-x-4">
          <p className="text-muted-foreground text-sm">Root:</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-start">
                {selectedRoot ? <>{selectedRoot}</> : <>+ Select root</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="right" align="start">
              <Command>
                <CommandInput placeholder="Change root..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {rootOptions.map((root) => (
                      <CommandItem
                        key={root}
                        value={root}
                        onSelect={(value) => {
                          setSelectedRoot(
                            rootOptions.find(
                              (priority) => priority === value,
                            ) || null,
                          );
                          setOpen(false);
                        }}
                      >
                        {root}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <RadioGroup
          onValueChange={(value: (typeof qualityOptions)[number]) =>
            setSelectedQuality(value)
          }
          className="flex"
          value={selectedQuality ? selectedQuality : undefined}
        >
          {qualityOptions.map((quality) => (
            <div key={quality} className="flex items-center space-x-2">
              <RadioGroupItem value={quality} id={quality} />
              <Label htmlFor={quality}>{quality}</Label>
            </div>
          ))}
        </RadioGroup>
        <Button variant="outline" onClick={addChordToPalette}>
          Add To Palette
        </Button>
        <Button variant="outline" onClick={addChord}>
          Add Chord
        </Button>
        <Button
          variant={"default"}
          onClick={() => {
            setBeatsArr([]);
          }}
        >
          Clear All
        </Button>
      </div>
      <div className="m-auto mb-2 mt-2 flex max-w-fit flex-wrap gap-4 rounded-xl border border-slate-200 bg-stone-50 p-4">
        {palette.map((chord) => (
          <Button
            variant="default"
            className="size-10 rounded-full"
            onClick={() => {
              setBeatsArr((prevBeatsArr) => [
                ...prevBeatsArr,
                {
                  id: uuidv4(),
                  chord: { root: chord.root, quality: chord.quality },
                },
              ]);
            }}
          >
            {chord.root}
            {chord.quality}
          </Button>
        ))}
      </div>
    </>
  );
}
