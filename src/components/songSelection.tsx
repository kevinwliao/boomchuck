"use client";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const songOptions = [
  "Big Spike Hammer",
  "Cripple Creek",
  "Cumberland Gap",
  "Old Home Place",
  "Rocky Top",
  "Blue Ridge Cabin Home",
  "Blue Night",
  "Mountain Dew",
  "Lonesome Road Blues",
  "Worried Man Blues",
  "Molly and Tenbrooks",
];

export function SongSelection() {
  const [open, setOpen] = React.useState(false);

  // managing "state" in URL instead of useState
  // const [selectedStatus, setSelectedStatus] = React.useState<
  //   (typeof songOptions)[number] | null
  // >(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const selectedStatus = searchParams.get("song")?.toString() || songOptions[0];

  function handleSearch(term: (typeof songOptions)[number]) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("song", term);
    } else {
      params.delete("song");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between truncate"
          >
            {selectedStatus ? selectedStatus : "Load song..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search song..." />
            <CommandEmpty>No song found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {songOptions.map((song) => (
                  <CommandItem
                    key={song}
                    defaultValue={selectedStatus}
                    // no longer need value attribute since we are not using state
                    // value={song}
                    onSelect={(value) => {
                      // setSelectedStatus(
                      //   songOptions.find((song) => song === value) || null,
                      // );
                      handleSearch(value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedStatus === song ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {song}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
