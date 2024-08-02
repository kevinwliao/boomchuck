import { z } from "zod";
import { readOnlySongsNames } from "./songs";

// options
export const rootOptions = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
] as const;
export const diatonicRootOptions = [
  "G",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F#",
] as const;
export const nonDiatonicRootOptionsA = ["G#", "A#"] as const;
export const nonDiatonicRootOptionsB = ["C#", "D#", "F"] as const;

export const qualityOptions = ["M", "m", "7"] as const;

// schemas
export const rootEnum = z.enum(rootOptions);
export const qualityEnum = z.enum(qualityOptions);
export const chordSchema = z.object({
  root: rootEnum,
  quality: qualityEnum,
});
export const measureSchema = z.object({
  chord: chordSchema,
  chord2: chordSchema.optional(),
  id: z.string(),
});

export const songSchema = z.object({
  userId: z.string().default("no_user"),
  slug: z.string().max(50),
  name: z.string().max(35),
  measures: z.array(measureSchema),
  tempo: z.number().optional(),
});

// type exports
export type Root = z.infer<typeof rootEnum>;
export type Quality = z.infer<typeof qualityEnum>;
export type Chord = z.infer<typeof chordSchema>;
export type Measure = z.infer<typeof measureSchema>;
export type Song = z.infer<typeof songSchema>;

// searchParamsSchema
export const searchParamsSchema = z.object({
  song: z.enum(readOnlySongsNames),
});
