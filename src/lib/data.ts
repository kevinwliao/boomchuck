import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Song } from "@/lib/schemas";

export async function fetchSongs() {
  noStore();
  try {
    const data = await sql<Song>`SELECT * FROM songs`;
    const songs = data.rows;
    return songs;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch song data.");
  }
}

export async function fetchSongBySlug(slug: string) {
  noStore();
  try {
    const data = await sql<Song>`SELECT * FROM songs WHERE user_id = ${slug}`;
    const song = data.rows[0];
    return song;
  } catch (error) {
    throw new Error("Failed to fetch song from slug.");
  }
}
