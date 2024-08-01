import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function makeSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
