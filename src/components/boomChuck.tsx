"use client";
import Volume from "@/components/volume";
import PlayPause from "@/app/playPause";
import React from "react";
import * as Tone from "tone";
import { Button } from "@/components/ui/button";
import Bpm from "@/components/bpm";
import Editor from "./ui/editor";
import { Chord, Beat } from "@/lib/types";
import { BigSpikeHammer as initBeatsArr } from "@/lib/songs";
import ChordInput from "./chordInput";

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

const PatternArr = ["boom1", "chuck", "boom2", "chuck"];

function chordToNotesArr(chord: Chord) {
  const rootFormed = chord.root + "4";
  const quality = chord.quality;
  return [
    Tone.Frequency(rootFormed).toFrequency(),
    Tone.Frequency(rootFormed)
      .transpose(quality === "M" ? 4 : 3)
      .toFrequency(),
    Tone.Frequency(rootFormed).transpose(7).toFrequency(),
  ];
}

export default function BoomChuck() {
  const [beatsArr, setBeatsArr] = React.useState<Beat[]>(initBeatsArr);
  const [started, setStarted] = React.useState(false);
  const [bpm, setBpm] = React.useState(100);
  const [volume, setVolume] = React.useState(0.8);
  const [idCounter, setIdCounter] = React.useState(1000);
  const [activeIndex, setActiveIndex] = React.useState(-1);

  const synthRef = React.useRef<Tone.PolySynth | null>(null);
  const seqRef = React.useRef<Tone.Sequence | null>(null);

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

  React.useEffect(() => {
    Tone.getTransport().bpm.value = bpm * 2;
    console.log("effect run");

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
      console.log("effect cleaned");
    };
  }, [beatsArr]);

  const updateBeatsArr = (index: number, chord: Chord) => {
    const newBeatsArr = beatsArr.map((beat, i) => {
      if (i === index) {
        const newBeat = { ...beat, chord: chord };
        return newBeat;
      } else {
        return beat;
      }
    });
    setBeatsArr(newBeatsArr);
  };

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
          //disabled={started}
        ></Bpm>

        <PlayPause
          className="size-20 cursor-pointer fill-stone-500 transition hover:fill-stone-700"
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
              // ramp to prevent noisy artifacts
              synthRef.current.volume.linearRampTo(
                // formula for mapping linear scale to decibels
                Math.log10(value) * 20,
                0.01,
              );
          }}
        ></Volume>
      </div>
      <ChordInput setBeatsArr={setBeatsArr}></ChordInput>
      <div className="m-auto w-max pb-4 text-sm font-medium">
        <div className="flex gap-3">
          {RootOptions.map((root, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setStarted(false);
                  setBeatsArr([
                    ...beatsArr,
                    {
                      id: idCounter,
                      chord: { root: root, quality: "M" },
                    },
                  ]);
                  setIdCounter((prevIdCounter) => prevIdCounter + 1);
                }}
              >
                {root}
              </button>
            );
          })}
          <Button variant="outline" onClick={() => setBeatsArr([])}>
            Clear All
          </Button>
        </div>
      </div>
      <Editor
        beatsArr={beatsArr}
        setBeatsArr={setBeatsArr}
        activeIndex={activeIndex}
      ></Editor>
    </>
  );
}
