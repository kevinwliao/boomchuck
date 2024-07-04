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
import { songsNames as songOptions } from "@/lib/songs";

type SongSelectionProps = { mobile: boolean };

export const SongSelection = React.forwardRef<HTMLElement, SongSelectionProps>(
  ({ mobile, ...props }, ref) => {
    const [open, setOpen] = React.useState(false);

    // managing "state" in URL instead of useState
    // const [selectedStatus, setSelectedStatus] = React.useState<
    //   (typeof songOptions)[number] | null
    // >(null);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { push } = useRouter();

    const selectedStatus =
      songOptions.find(
        (songName) => songName === searchParams.get("song")?.toString(),
      ) || null;

    function handleSearch(term: (typeof songOptions)[number]) {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("song", term);
      } else {
        params.delete("song");
      }
      push(`${pathname}?${params.toString()}`);
    }

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={mobile ? "ghost" : "outline"}
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            <span className="truncate">
              {selectedStatus ? selectedStatus : "Load song..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="relative w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search song..." />
            <CommandEmpty>No song found.</CommandEmpty>
            <CommandList>
              <CommandGroup>
                {songOptions.sort().map((song) => (
                  <CommandItem
                    key={song}
                    // getting around types
                    defaultValue={selectedStatus ? selectedStatus : undefined}
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
                        "mr-2 h-4 w-4 shrink-0 grow-0",
                        selectedStatus === song ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div>{song}</div>
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
