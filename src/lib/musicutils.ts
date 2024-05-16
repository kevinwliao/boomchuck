import { Chord } from "./types";
import * as Tone from "tone";

export function chordToNotesArr(chord: Chord) {
  const rootFormed = chord.root + "4";
  const quality = chord.quality;
  const rootTone = Tone.Frequency(rootFormed);

  switch (quality) {
    case "M":
      return [
        rootTone.toFrequency(),
        rootTone.transpose(4).toFrequency(),
        rootTone.transpose(7).toFrequency(),
      ];
    case "m":
      return [
        rootTone.toFrequency(),
        rootTone.transpose(3).toFrequency(),
        rootTone.transpose(7).toFrequency(),
      ];
    case "7":
      return [
        rootTone.toFrequency(),
        rootTone.transpose(4).toFrequency(),
        rootTone.transpose(7).toFrequency(),
        rootTone.transpose(10).toFrequency(),
      ];
    default:
      return [];
  }
}
