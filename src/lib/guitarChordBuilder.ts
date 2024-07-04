import { Chord } from "./types";
import * as Tone from "tone";
const standardTuning = [40, 45, 50, 55, 59, 64];

const chordChart = {
  CM: [null, 3, 2, 0, 1, 0],
  Cm: [null, 3, 5, 5, 4, 3],
  C7: [null, 3, 2, 3, 1, 0],
  "C#M": [null, 4, 6, 6, 6, 4],
  "C#m": [null, 4, 6, 6, 5, 4],
  "C#7": [null, 4, 6, 4, 6, 4],
  DM: [null, null, 0, 2, 3, 2],
  Dm: [null, null, 0, 2, 3, 1],
  D7: [null, null, 0, 2, 1, 2],
  "D#M": [null, 6, 8, 8, 8, 6],
  "D#m": [null, 6, 8, 8, 7, 6],
  "D#7": [null, 6, 8, 6, 8, 6],
  EM: [0, 2, 2, 0, 0, 0],
  Em: [0, 2, 2, 0, 0, 0],
  E7: [0, 2, 0, 1, 0, 0],
  FM: [1, 3, 3, 2, 1, 1],
  Fm: [1, 3, 3, 1, 1, 1],
  F7: [1, 3, 1, 2, 1, 1],
  "F#M": [2, 4, 4, 3, 2, 2],
  "F#m": [2, 4, 4, 2, 2, 2],
  "F#7": [2, 4, 2, 3, 2, 2],
  GM: [3, 2, 0, 0, 0, 3],
  Gm: [3, 5, 5, 3, 3, 3],
  G7: [3, 2, 0, 0, 0, 1],
  "G#M": [4, 6, 6, 5, 4, 4],
  "G#m": [4, 6, 6, 4, 4, 4],
  "G#7": [4, 6, 4, 5, 4, 4],
  AM: [null, null, 2, 2, 2, 0],
  Am: [null, null, 2, 2, 1, 0],
  A7: [null, null, 2, 0, 2, 0],
  "A#M": [null, 1, 3, 3, 3, 1],
  "A#m": [null, 1, 3, 3, 2, 1],
  "A#7": [null, 1, 3, 1, 3, 1],
  BM: [2, 2, 4, 4, 4, 2],
  Bm: [2, 2, 4, 4, 3, 2],
  B7: [null, 2, 1, 2, 0, 2],
};

type chordChartKeyType = keyof typeof chordChart;

export function guitarChordToMidiArr(chord: chordChartKeyType) {
  const newArr = chordChart[chord].map((value, i) => {
    if (value !== null) {
      return value + standardTuning[i];
    } else {
      return null;
    }
  });
  return newArr;
}

// idk
export function chordToNotesArr(chord: Chord) {
  const chordChartKey = chord.root + chord.quality;

  const unfilteredArr: (Tone.Unit.Frequency | null)[] = chordChart[
    chordChartKey as chordChartKeyType
  ].map((value, i) => {
    if (value !== null) {
      return Tone.Frequency(value + standardTuning[i], "midi").toNote();
    } else {
      return null;
    }
  });
  const filteredArr: Tone.Unit.Frequency[] = unfilteredArr.filter(
    (value): value is Tone.Unit.Frequency => value !== null,
  );
  return filteredArr;
}

export function strumChord(
  instrument: Tone.Sampler,
  chord: Tone.Unit.Frequency[],
  time: any,
) {
  for (let i = 0; i < chord.length; i++) {
    instrument.triggerAttackRelease(
      chord[i],
      0.2,
      // strumming humanizing algorithm
      Tone.Time(time).toSeconds() + 0.004 * (7 - i),
      // humanize volume
      Math.random() * 0.2 + 0.4,
    );
  }
}
