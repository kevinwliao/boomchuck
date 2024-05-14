"use client";

import * as React from "react";

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

const qualityOptions = ["M", "m", "7"] as const;

export function QualitySelection() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<
    (typeof qualityOptions)[number] | null
  >(null);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-muted-foreground text-sm">Quality:</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="hidden">
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus}</> : <>+ Select quality</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change quality..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {qualityOptions.map((quality) => (
                  <CommandItem
                    key={quality}
                    value={quality}
                    onSelect={(value) => {
                      setSelectedStatus(
                        qualityOptions.find((priority) => priority === value) ||
                          null,
                      );
                      setOpen(false);
                    }}
                  >
                    {quality}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <RadioGroup className="flex" defaultValue={qualityOptions[0]}>
        {qualityOptions.map((quality) => (
          <div className="flex items-center space-x-2">
            <RadioGroupItem value={quality} id={quality} />
            <Label htmlFor={quality}>{quality}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
