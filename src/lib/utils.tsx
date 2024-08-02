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

export const sharpUnicode = "\u266f";
export const flatUnicode = "\u266d";
export const placeAccidentals = (str: string | undefined) =>
  str ? <>{str.replace("#", sharpUnicode)}</> : <></>;
