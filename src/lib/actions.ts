import { z } from "zod";
import { Beat, Chord } from "./types";
import { readOnlySongsNames } from "./songs";

export const searchParamsSchema = z.object({
  song: z.enum(readOnlySongsNames),
});
