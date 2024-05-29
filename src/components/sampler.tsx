import * as Tone from "tone";
import { useState, useEffect, useRef } from "react";

const url = (note: string) => {
  return `/bass/${note}.wav`;
};

const guitarMapping = {
  F4: "/guitar-acoustic/F4.wav",
  "F#2": "/guitar-acoustic/Fs2.wav",
  "F#3": "/guitar-acoustic/Fs3.wav",
  "F#4": "/guitar-acoustic/Fs4.wav",
  G2: "/guitar-acoustic/G2.wav",
  G3: "/guitar-acoustic/G3.wav",
  G4: "/guitar-acoustic/G4.wav",
  "G#2": "/guitar-acoustic/Gs2.wav",
  "G#3": "/guitar-acoustic/Gs3.wav",
  "G#4": "/guitar-acoustic/Gs4.wav",
  A2: "/guitar-acoustic/A2.wav",
  A3: "/guitar-acoustic/A3.wav",
  A4: "/guitar-acoustic/A4.wav",
  "A#2": "/guitar-acoustic/As2.wav",
  "A#3": "/guitar-acoustic/As3.wav",
  "A#4": "/guitar-acoustic/As4.wav",
  B2: "/guitar-acoustic/B2.wav",
  B3: "/guitar-acoustic/B3.wav",
  B4: "/guitar-acoustic/B4.wav",
  C3: "/guitar-acoustic/C3.wav",
  C4: "/guitar-acoustic/C4.wav",
  C5: "/guitar-acoustic/C5.wav",
  "C#3": "/guitar-acoustic/Cs3.wav",
  "C#4": "/guitar-acoustic/Cs4.wav",
  "C#5": "/guitar-acoustic/Cs5.wav",
  D2: "/guitar-acoustic/D2.wav",
  D3: "/guitar-acoustic/D3.wav",
  D4: "/guitar-acoustic/D4.wav",
  D5: "/guitar-acoustic/D5.wav",
  "D#2": "/guitar-acoustic/Ds2.wav",
  "D#3": "/guitar-acoustic/Ds3.wav",
  "D#4": "/guitar-acoustic/Ds3.wav",
  E2: "/guitar-acoustic/E2.wav",
  E3: "/guitar-acoustic/E3.wav",
  E4: "/guitar-acoustic/E4.wav",
  F2: "/guitar-acoustic/F2.wav",
  F3: "/guitar-acoustic/F3.wav",
};

export default function Sampler() {
  const [isLoaded, setLoaded] = useState(false);
  const samplerRef = useRef<Tone.Sampler | null>(null);

  useEffect(() => {
    samplerRef.current = new Tone.Sampler(guitarMapping, {
      onload: () => setLoaded(true),
    }).toDestination();
  });

  const handleClick = () => samplerRef.current?.triggerAttack("F2");

  return (
    <div>
      <button disabled={!isLoaded} onClick={handleClick}>
        start
      </button>
    </div>
  );
}
