"use client";

import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Quality, qualityOptions } from "@/lib/schemas";

export function QualitySelection({
  qualitySelection,
  onValueChange,
}: {
  qualitySelection: Quality;
  onValueChange: (value: Quality) => void;
}) {
  return (
    <ToggleGroup.Root
      className="flex gap-1 lg:gap-2"
      type="single"
      value={qualitySelection}
      onValueChange={onValueChange}
    >
      {qualityOptions.map((quality, i) => (
        <ToggleGroup.Item
          key={i}
          value={quality}
          className={`${qualitySelection === quality ? " bg-stone-300 " : "bg-white"} size-10 border  transition-colors first:rounded-l-md last:rounded-r-md lg:size-12`}
        >
          {quality}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
