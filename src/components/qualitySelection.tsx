"use client";

import * as React from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Quality, qualityOptions } from "@/lib/schemas";

export function QualitySelection({
  qualitySelection,
  onValueChange,
}: {
  qualitySelection: Quality;
  onValueChange: (value: Quality) => void;
}) {
  return (
    <RadioGroup.Root
      className="flex gap-1 lg:gap-2"
      value={qualitySelection}
      onValueChange={onValueChange}
    >
      {qualityOptions.map((quality, i) => (
        <RadioGroup.Item
          key={i}
          value={quality}
          className={`${qualitySelection === quality ? " bg-stone-300 " : "bg-white"} size-10 border  transition-colors first:rounded-l-md last:rounded-r-md lg:size-12`}
        >
          <RadioGroup.Indicator> </RadioGroup.Indicator>
          {quality}
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  );
}
