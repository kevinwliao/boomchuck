"use client";
import Volume from "@/components/volume";
import PlayPause from "@/components/playPause";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import Bpm from "@/components/bpm";
import Editor from "./editor";
import { Chord, Beat } from "@/lib/types";
import { BigSpikeHammer as initBeatsArr } from "@/lib/songs";
import ChordInput from "./chordInput";
import { chordToNotesArr } from "@/lib/musicutils";

export default function BoomChuck() {
  const [beatsArr, setBeatsArr] = useState<Beat[]>(initBeatsArr);
  const [started, setStarted] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [volume, setVolume] = useState(0.8);
  const [activeIndex, setActiveIndex] = useState(-1);

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const seqRef = useRef<Tone.Sequence | null>(null);

  // from ytbsequencer
  const handleStartClick = async () => {
    if (Tone.getTransport().state === "started") {
      Tone.getTransport().pause();
      setStarted(false);
    } else {
      await Tone.start();
      Tone.getTransport().start();
      setStarted(true);
    }
  };

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm * 2;

    synthRef.current = new Tone.PolySynth({ volume: volume }).toDestination();
    seqRef.current = new Tone.Sequence(
      (time, index) => {
        // may need to remove beatsArr as a dependency? so we can update the "chord" inside the object instead of updating the "beat" itself
        // maybe this is not an issue. do we want the track to be able to change dynamically during playback? probably not XD
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
      [...beatsArr.map((beat, i) => i)],
      "1n",
    );
    seqRef.current.start(0);
    // if (started) {
    //   seqRef.current.start();
    //   Tone.getTransport().start();
    // } else {
    //   setActiveIndex(-1);
    // }

    return () => {
      seqRef.current?.dispose();
      Tone.getTransport().stop();
    };
  }, [beatsArr]);

  return (
    <>
      <div className="m-auto grid w-80 grid-cols-3 justify-items-center sm:w-96">
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
        ></Bpm>
        <PlayPause
          className="size-14 cursor-pointer fill-stone-500 transition hover:fill-stone-700 md:size-20"
          // onClick={() => {
          //   Tone.start();
          //   setStarted((prevStarted) => !prevStarted);
          // }}
          onClick={handleStartClick}
          started={started}
        ></PlayPause>
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
