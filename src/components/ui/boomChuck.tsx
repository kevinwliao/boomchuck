"use client";
import Volume from "@/components/ui/volume";
import { RootSelection } from "@/app/rootSelection";
import PlayPause from "@/app/playPause";
import { QualitySelection } from "@/app/qualitySelection";
import React from "react";
import {
  XCircleIcon,
  DocumentDuplicateIcon,
  PencilSquareIcon,
} from "@heroicons/react/20/solid";
import * as Tone from "tone";
import { Button } from "@/components/ui/button";
import Bpm from "@/components/ui/bpm";
import Editor from "./editor";
import { v4 as uuidv4 } from "uuid";
import { Chord, Beat } from "@/lib/types";
import { BigSpikeHammer as initBeatsArr } from "@/lib/songs";

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
  const [idCounter, setIdCounter] = React.useState(1000);

  const [activeIndex, setActiveIndex] = React.useState(-1);

  const synthRef = React.useRef<Tone.PolySynth | null>(null);
  const seqRef = React.useRef<Tone.Sequence | null>(null);

  React.useEffect(() => {
    Tone.getTransport().bpm.value = bpm * 2;

    synthRef.current = new Tone.PolySynth().toDestination();
    seqRef.current = new Tone.Sequence(
      (time, beat) => {
        setActiveIndex(
          (prevActiveIndex) => (prevActiveIndex + 1) % beatsArr.length,
        );
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
      },
      [...beatsArr],
      "1n",
    );
    if (started) {
      seqRef.current.start();
      Tone.getTransport().start();
    } else {
      setActiveIndex(-1);
    }

    return () => {
      seqRef.current?.dispose();
      Tone.getTransport().stop();
    };
  }, [started, beatsArr]);

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
      <div className="flex justify-center gap-12">
        <Bpm bpm={bpm} onChange={(e) => setBpm(+e.target.value)}></Bpm>
        <PlayPause
          className="size-20 cursor-pointer fill-stone-500 transition hover:fill-stone-700"
          onClick={() => {
            Tone.start();
            setStarted((prevStarted) => !prevStarted);
          }}
          started={started}
        ></PlayPause>
        <Volume></Volume>
      </div>
      <div className="m-auto my-4 flex max-w-fit flex-wrap gap-4 rounded-xl border border-slate-200 bg-stone-100 p-4">
        <RootSelection></RootSelection>
        <QualitySelection></QualitySelection>
        <Button variant="outline">Add Chord</Button>
      </div>
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
      {/* <div className="m-auto grid w-full grid-cols-4 gap-2 sm:w-10/12 lg:w-8/12 lg:grid-cols-8">
        {beatsArr.map((beat, index) => {
          return (
            <div
              key={beat.id}
              className={`group relative box-border flex flex-shrink flex-grow  basis-20 select-none flex-row items-center justify-center rounded-lg border border-slate-200 p-2 odd:bg-white even:bg-stone-300 ${
                index === activeIndex ? "ring-2 ring-amber-200" : ""
              }`}
            >
              <div className="">
                <div
                  id=""
                  className="invisible opacity-0 transition duration-500 group-hover:visible group-hover:opacity-100"
                >
                  <button
                    className="absolute -right-1 -top-1"
                    onClick={() => {
                      setBeatsArr(beatsArr.filter((b) => b !== beat));
                    }}
                  >
                    <XCircleIcon className="size-4 fill-red-500"></XCircleIcon>
                  </button>
                  <button
                    className="absolute -bottom-1 -right-1"
                    onClick={() => {
                      const newBeatsArr = [
                        ...beatsArr.slice(0, index),
                        { ...beat },
                        ...beatsArr.slice(index),
                      ];
                      setBeatsArr(newBeatsArr);
                    }}
                  >
                    <DocumentDuplicateIcon className="size-4 text-green-500"></DocumentDuplicateIcon>
                  </button>
                </div>
                <div className="font-mono text-xl  font-semibold tracking-tight">
                  <span>{beat.chord.root}</span>
                  <span>{beat.chord.quality}</span>
                  <span>{beat.id}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div> */}
      <Editor
        beatsArr={beatsArr}
        setBeatsArr={setBeatsArr}
        activeIndex={activeIndex}
      ></Editor>
    </>
  );
}
