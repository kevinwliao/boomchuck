import * as Tone from "tone";

let beatArrFlattened = [
  { beat: 1, chord: "GM" },
  { beat: 2, chord: "GM" },
  { beat: 3, chord: "GM" },
];

synthRef.current = new Tone.PolySynth({ volume: volume }).toDestination();
seqRef.current = new Tone.Sequence(
  (time, value) => {
    const beat = beatsArr[index];

    synthRef.current?.triggerAttackRelease(
      beat.chord.root + "2",
      0.1,
      Tone.Time(time).toSeconds(),
    );
    synthRef.current?.triggerAttackRelease(
      chordToNotesArr(beat.chord),
      0.1,
      Tone.Time(time).toSeconds() + Tone.Time("4n").toSeconds(),
    );
    synthRef.current?.triggerAttackRelease(
      Tone.Frequency(beat.chord.root + "2")
        .transpose(-5)
        .toFrequency(),
      0.1,
      Tone.Time(time).toSeconds() +
        Tone.Time("4n").toSeconds() +
        Tone.Time("4n").toSeconds(),
    );
    synthRef.current?.triggerAttackRelease(
      chordToNotesArr(beat.chord),
      0.1,
      Tone.Time(time).toSeconds() +
        Tone.Time("4n").toSeconds() +
        Tone.Time("4n").toSeconds() +
        Tone.Time("4n").toSeconds(),
    );
    setActiveIndex((prevActiveIndex) => {
      if (prevActiveIndex + 1 < beatsArr.length) {
        return prevActiveIndex + 1;
      } else {
        return 0;
      }
    });
    setActiveIndex(index);
  },
  beatArrFlattened,
  "1n",
);
