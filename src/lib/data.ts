import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Song } from "@/lib/schemas";

export async function fetchSongs() {
  noStore();
  try {
    console.log("Fetching revenue data...");
    const data = await sql<Song>`SELECT * FROM songs`;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}
