"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useState } from "react";
import { Song } from "@/lib/schemas";

type SongSelectionProps = { songs: Song[] };

const SongSelection = React.forwardRef<HTMLElement, SongSelectionProps>(
  ({ songs, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    function handleSearch() {}

    return (
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <button
            role="combobox"
            aria-expanded={open}
            className="flex w-[200px] items-center justify-between"
          >
            <span className="truncate">
              {selectedSong ? selectedSong.name : "Load song..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="relative w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search song..." />
            <CommandEmpty>No song found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {songs.map((song) => (
                  <CommandItem
                    key={song.name}
                    value={song.name}
                    onSelect={(value) => {
                      setSelectedSong(
                        songs.find((song) => song.name === value) || null,
                      );
                      handleSearch();
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 shrink-0 grow-0",
                        selectedSong === song ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div>{song.name}</div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
);
SongSelection.displayName = "SongSelection";

export default SongSelection;
