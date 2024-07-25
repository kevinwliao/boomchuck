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
  "E#",
  "F",
  "F#",
  "G",
] as const;
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
});
export const songSchema = z.object({
  userId: z.string().default("no_user"),
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
