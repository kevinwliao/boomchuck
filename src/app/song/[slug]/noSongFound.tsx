"use client";

import Link from "next/link";

export default function NoSongFound() {
  return (
    <div>
      <div>No song found.</div>
      <button>
        <Link href="/">Let's make one!</Link>
      </button>
    </div>
  );
}
