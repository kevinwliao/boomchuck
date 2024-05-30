"use client";
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
import { Eraser } from "lucide-react";

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
] as Chord[];

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
    const chordFoundInPalette = palette.find(
      (chord) =>
        chord.quality === selectedQuality && chord.root === selectedRoot,
    );
    if (chordSelected && !chordFoundInPalette) {
      setPalette([
        ...palette,
        { root: selectedRoot, quality: selectedQuality },
      ]);
    }
  };

  return (
    <>
      <div className="m-auto mb-2 mt-2 flex max-w-max flex-wrap justify-center gap-4 rounded-md border p-4 sm:w-10/12">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">Root:</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[100px] justify-start">
                {selectedRoot ? <>{selectedRoot}</> : <>+ Select root</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-max p-0" side="bottom" align="start">
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
          variant={"destructive"}
          onClick={() => {
            setBeatsArr([]);
          }}
        >
          Clear
        </Button>
      </div>
      <div className="group relative m-auto mb-2 mt-2 flex max-w-fit flex-wrap justify-center gap-4 rounded-md border p-4 ">
        {palette.map((chord, index) => (
          <Button
            key={index}
            variant="default"
            size="icon"
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
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-full"
          onClick={() => {
            setPalette((prevPalette) => prevPalette.slice(0, -1));
          }}
        >
          <Eraser className="h-[1.2rem] w-[1.2rem]"></Eraser>
        </Button>
      </div>
    </>
  );
}
