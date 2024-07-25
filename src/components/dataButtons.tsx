"use client";
import { createSong, clearSubmitted } from "@/lib/actions";
import { useState } from "react";

export default function DataButtons() {
  return (
    <>
      <button
        className="w-max rounded-2xl bg-slate-950 p-4 text-white hover:bg-slate-800 hover:drop-shadow-md"
        onClick={async () => {
          const messageResult = await createSong();
          console.log(messageResult);
        }}
      >
        <div>Submit the song</div>
      </button>
      <button
        className="w-max rounded-2xl bg-slate-950 p-4 text-white hover:bg-slate-800 hover:drop-shadow-md"
        onClick={async () => {
          const messageResult = await clearSubmitted();
          console.log(messageResult);
        }}
      >
        <div>Clear Submitted</div>
      </button>
    </>
  );
}
