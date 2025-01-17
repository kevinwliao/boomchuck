"use client";
import Volume from "@/components/volume";
import PlayStop from "@/components/playStop";
import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import Bpm from "@/components/bpm";
import Editor from "./editor";
import EditorEmpty from "@/components/editorEmpty";
import { Chord, Beat, Song } from "@/lib/types";
import ChordInput from "./chordInput";
import { chordToNotesArr } from "@/lib/guitarChordBuilder";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SongsArray } from "@/lib/songs";
import { searchParamsSchema } from "@/lib/schemas";
import { strumChord } from "@/lib/guitarChordBuilder";
import { guitarMapping } from "@/lib/musicutils";

const url = (note: string) => {
  return `/bass/${note}.wav`;
};

export default function BoomChuck() {
  const searchParams = useSearchParams();
  const validatedSearchParams = searchParamsSchema.safeParse(searchParams);

  const selectedSongName = searchParams.get("song");
  const selectedSong = SongsArray.find(
    (song) => song.name === selectedSongName,
  );

  const [beatsArr, setBeatsArr] = useState<Beat[]>(() =>
    selectedSong ? selectedSong.beatsArr : [],
  );
  const [started, setStarted] = useState(false);
  const [bpm, setBpm] = useState(110);
  const [volume, setVolume] = useState(0.8);
  const [activeIndex, setActiveIndex] = useState(-1);

  const synthRef = useRef<Tone.PolySynth | null>(null);
  const volumeRef = useRef<Tone.Volume | null>(null);
  const seqRef = useRef<Tone.Sequence | null>(null);

  // consider splitting into two functions; state is evaluated twice but I like the clarity
  const handleStartClick = () => {
    console.log("adsfads");
    if (started) {
      Tone.getTransport().pause();
      Tone.getTransport().position = "0:0:0";
      setStarted(false);
      setActiveIndex(-1);
    } else {
      // start slightly later for scheduling performance
      Tone.getTransport().start("+0.1");
      setStarted(true);
    }
  };

  // update state when searchparams change
  useEffect(() => {
    if (selectedSong) setBeatsArr(selectedSong.beatsArr);
    else {
      setBeatsArr([]);
    }
    setStarted(false);
    setActiveIndex(-1);
  }, [selectedSong]);

  useEffect(() => {
    // for performance
    Tone.setContext(new Tone.Context({ latencyHint: "playback" }));
    // initialize tempo
    Tone.getTransport().bpm.value = bpm * 2;

    volumeRef.current = new Tone.Volume(volume).toDestination();
    const compressor = new Tone.Compressor(-30, 5).connect(volumeRef.current);
    synthRef.current = new Tone.PolySynth({ volume: volume }).connect(
      compressor,
    );

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

    seqRef.current = new Tone.Sequence(
      (time, index) => {
        const beatIndex = Math.floor(index / 4);
        const beat = beatsArr[beatIndex];
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
              if (prevActiveIndex + 1 < beatsArr.length) {
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
      Array.from(Array(beatsArr.length * 4).keys()),
      "4n",
    );
    seqRef.current.start("+0:8:0");
    Tone.getTransport().loopStart = "+0:8:0";
    Tone.getTransport().loopEnd = seqRef.current.loopEnd;
    return () => {
      seqRef.current?.dispose();
      synthRef.current?.dispose();
      countInSeq.dispose();
      countInSynth.dispose();
      Tone.getTransport().stop();
      Tone.getContext().dispose();
    };
  }, [beatsArr]);

  return (
    <div id="boomchuck">
      <div className=" m-auto grid w-72 max-w-full grid-cols-3 justify-items-center  gap-0 bg-background p-2 sm:w-80 sm:gap-2 md:w-96">
        <Bpm
          bpm={bpm}
          onChange={(e) => {
            if (e.target.value == "") {
              e.target.value = "60";
            }
            const value = parseInt(e.target.value);
            setBpm(value);
            Tone.getTransport().bpm.rampTo(value * 2, 0.01);
          }}
          disabled={false}
        ></Bpm>
        <PlayStop
          className="size-14 fill-primary transition hover:fill-primary/90 disabled:cursor-not-allowed disabled:opacity-50 md:size-20"
          onClick={handleStartClick}
          started={started}
          disabled={beatsArr.length === 0}
        ></PlayStop>
        <Volume
          volume={volume}
          onValueChange={([value]) => {
            setVolume(value);
            if (volumeRef.current)
              volumeRef.current.volume.linearRampTo(
                // formula for mapping linear scale to decibels
                Math.log10(value) * 20,
                0.01,
              );
          }}
        ></Volume>
      </div>
      <ChordInput setBeatsArr={setBeatsArr}></ChordInput>
      {beatsArr.length === 0 ? (
        <EditorEmpty></EditorEmpty>
      ) : (
        <Editor
          beatsArr={beatsArr}
          setBeatsArr={setBeatsArr}
          activeIndex={activeIndex}
          started={started}
        ></Editor>
      )}
    </div>
  );
}
