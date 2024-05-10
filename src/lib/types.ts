const RootOptions = [
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
] as const;

const QualityOptions = ["M", "m", "7"];

export type Chord = {
  root: (typeof RootOptions)[number];
  quality: (typeof QualityOptions)[number];
};

export type Beat = {
  id: number;
  chord: Chord;
};

export type Song = Beat[];