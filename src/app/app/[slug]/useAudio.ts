import { chordToNotesArr, strumChord } from "@/lib/guitarChordBuilder";
import { guitarMapping } from "@/lib/musicutils";
import { Measure } from "@/lib/schemas";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import * as Tone from "tone";

const url = (note: string) => {
  return `/bass/${note}.wav`;
};

export default function useAudio(
  bpm: number,
  volume: number,
  measures: Measure[],
  loop: boolean,
  setPlaying: Dispatch<SetStateAction<boolean>>,
  setActiveIndex: Dispatch<SetStateAction<number>>,
) {
  const volumeRef = useRef<Tone.Volume | null>(null);

  useEffect(() => {
    // for performance
    Tone.setContext(new Tone.Context({ latencyHint: "playback" }));
    // initialize tempo
    Tone.getTransport().bpm.value = bpm * 2;

    volumeRef.current = new Tone.Volume(volume).toDestination();
    const compressor = new Tone.Compressor(-30, 5).connect(volumeRef.current);
    const synth = new Tone.PolySynth({ volume: volume }).connect(compressor);

    const bassSampler = new Tone.Sampler({
      G1: url("G1"),
      A1: url("A1"),
      B1: url("B1"),
      C2: url("C2"),
      D2: url("D2"),
      E2: url("E2"),
      F2: url("F2"),
      G2: url("G2"),
      A2: url("A2"),
      B2: url("B2"),
      C3: url("C3"),
    }).connect(compressor);

    const guitarSampler = new Tone.Sampler({
      urls: guitarMapping,
      release: 0.7,
    }).connect(compressor);

    const countInSynth = new Tone.NoiseSynth().connect(compressor);
    const countInSeq = new Tone.Sequence(
      (time) => {
        countInSynth.triggerAttackRelease(0.1, time);
      },
      [0, 1, 2, 3],
      "2n",
    );
    countInSeq.loop = false;
    countInSeq.start();

    const sequence = new Tone.Sequence(
      (time, index) => {
        const beatIndex = Math.floor(index / 4);
        const beat = measures[beatIndex];
        const position = (index % 4) + 1;

        switch (position) {
          case 1:
            bassSampler.triggerAttackRelease(
              beat.chord.root === "C"
                ? beat.chord.root + "2"
                : beat.chord.root + "2",
              0.7,
              time,
              2,
            );
            setActiveIndex((prevActiveIndex) => {
              if (prevActiveIndex + 1 < measures.length) {
                return prevActiveIndex + 1;
              } else {
                return 0;
              }
            });
            setActiveIndex(beatIndex);
            break;
          case 2:
            // offset for strumming delay
            strumChord(guitarSampler, chordToNotesArr(beat.chord), time - 0.05);
            break;
          case 3:
            bassSampler.triggerAttackRelease(
              Tone.Frequency(
                beat.chord.root === "C"
                  ? beat.chord.root + "2"
                  : beat.chord.root + "2",
              )
                .transpose(-5)
                .toFrequency(),
              0.7,
              time,
              2,
            );
            break;
          case 4:
            // offset for strumming delay
            strumChord(guitarSampler, chordToNotesArr(beat.chord), time - 0.05);
            break;
        }
      },
      Array.from(Array(measures.length * 4).keys()),
      "4n",
    );
    sequence.start("+0:8:0");
    Tone.getTransport().loopStart = "+0:8:0";
    Tone.getTransport().loopEnd = sequence.loopEnd;

    return () => {
      sequence.dispose();
      synth.dispose();
      countInSeq.dispose();
      countInSynth.dispose();
      Tone.getTransport().stop();
      Tone.getContext().dispose();
    };
  }, [measures]);
  return { volumeRef };
}
