"use client";
import Volume from "@/components/volume";
import PlayStop from "@/components/playStop";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import Bpm from "@/components/bpm";
import Editor from "./editor";
import { Chord, Beat } from "@/lib/types";
import { RockyTop as initSong } from "@/lib/songs";
import ChordInput from "./chordInput";
import { chordToNotesArr } from "@/lib/guitarChordBuilder";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function BoomChuck() {
  const [beatsArr, setBeatsArr] = useState<Beat[]>(initSong.beatsArr);
  const [started, setStarted] = useState(false);
  const [bpm, setBpm] = useState(140);
  const [volume, setVolume] = useState(0.8);
  const [activeIndex, setActiveIndex] = useState(-1);

  // we don't technically need to store these refs but we may want to keep them in order to dynamically update later
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const seqRef = useRef<Tone.Sequence | null>(null);

  const handleStartClick = async () => {
    if (Tone.getTransport().state === "started") {
      Tone.getTransport().pause();
      Tone.getTransport().position = "0:0:0";
      setStarted(false);
      setActiveIndex(-1);
    } else {
      Tone.getTransport().start();
      setStarted(true);
    }
  };

  useEffect(() => {
    // initialize tempo with state
    Tone.getTransport().bpm.value = bpm * 2;

    const compressor = new Tone.Compressor(-30, 5).toDestination();
    synthRef.current = new Tone.PolySynth({ volume: volume }).connect(
      compressor,
    );

    // COUNT IN! 1, 2, 1, 2, 3, 4!
    const clapSynth = new Tone.NoiseSynth().connect(compressor);
    const countInSeq = new Tone.Sequence(
      (time, index) => {
        clapSynth.triggerAttackRelease(0.1, time);
      },
      [0, 1, [0, 1], [2, 3]],
      "1n",
    );
    countInSeq.loop = false;
    countInSeq.start();

    seqRef.current = new Tone.Sequence(
      (time, index) => {
        const beat = beatsArr[index];
        synthRef.current?.triggerAttackRelease(
          beat.chord.root + "2",
          0.1,
          Tone.Time(time).toSeconds(),
          1,
        );
        synthRef.current?.triggerAttackRelease(
          chordToNotesArr(beat.chord),
          0.1,
          Tone.Time(time).toSeconds() + Tone.Time("4n").toSeconds(),
          0.5,
        );
        synthRef.current?.triggerAttackRelease(
          Tone.Frequency(beat.chord.root + "2")
            .transpose(-5)
            .toFrequency(),
          0.1,
          Tone.Time(time).toSeconds() +
            Tone.Time("4n").toSeconds() +
            Tone.Time("4n").toSeconds(),
          1,
        );
        synthRef.current?.triggerAttackRelease(
          chordToNotesArr(beat.chord),
          0.1,
          Tone.Time(time).toSeconds() +
            Tone.Time("4n").toSeconds() +
            Tone.Time("4n").toSeconds() +
            Tone.Time("4n").toSeconds(),
          0.5,
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
      [...beatsArr.map((beat, i) => i)],
      "1n",
    );
    seqRef.current.start("+0:16:0");
    Tone.getTransport().loopStart = "+0:16:0";
    return () => {
      seqRef.current?.dispose();
      synthRef.current?.dispose();
      countInSeq.dispose();
      clapSynth.dispose();
      Tone.getTransport().stop();
    };
  }, [beatsArr]);

  return (
    <>
      <div className="m-auto grid w-80 grid-cols-3 justify-items-center sm:w-96 ">
        <Bpm
          bpm={bpm}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setBpm(value);
            Tone.getTransport().bpm.rampTo(value * 2, 0.01);
          }}
          // onValueChange for slider, onChange for number input
          onValueChange={([value]) => {
            setBpm(value);
            Tone.getTransport().bpm.rampTo(value * 2, 0.01);
          }}
          disabled={started}
        ></Bpm>
        <div className="flex">
          <PlayStop
            className="size-14 cursor-pointer fill-primary transition hover:fill-primary/90 md:size-20"
            onClick={handleStartClick}
            started={started}
          ></PlayStop>
        </div>
        <Volume
          volume={volume}
          onValueChange={([value]) => {
            setVolume(value);
            if (synthRef.current)
              synthRef.current.volume.linearRampTo(
                // formula for mapping linear scale to decibels
                Math.log10(value) * 20,
                0.01,
              );
          }}
        ></Volume>
      </div>
      <ChordInput setBeatsArr={setBeatsArr}></ChordInput>
      <Editor
        beatsArr={beatsArr}
        setBeatsArr={setBeatsArr}
        activeIndex={activeIndex}
        started={started}
      ></Editor>
    </>
  );
}
