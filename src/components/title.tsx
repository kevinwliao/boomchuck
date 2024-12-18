"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const untitled = "Untitled Song";
function Title() {
  const [title, setTitle] = useState(untitled);
  const [focused, setFocused] = useState(false);

  const handleKeyUp:
    | React.KeyboardEventHandler<HTMLInputElement>
    | undefined = (e) => {
    if (e.key === "Enter") {
      //@ts-ignore
      e.target.blur();
    }
  };

  return (
    <Input
      className={`h-8 max-w-64 rounded-sm border-border text-base focus-visible:ring-blue-800`}
      value={title}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onChange={(e) => setTitle(e.target.value)}
      onKeyUp={handleKeyUp}
      placeholder={untitled}
    ></Input>
  );
}

export default Title;
