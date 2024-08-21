import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { Song } from "@/lib/schemas";
import { auth } from "@/auth";
import { db, users } from "@/schema";
import { eq } from "drizzle-orm";

export async function fetchUserSongs() {
  const session = await auth();
  // making sure id is defined
  if (!session || !session.user || !session.user.id) {
    return [];
  }
  const currentId = session.user.id;
  try {
    const data = await db.select().from(users).where(eq(users.id, currentId));
    return data;
  } catch (error) {
    return [];
  }
}

export async function fetchSongs() {
  noStore();
  try {
    const data = await sql<Song>`SELECT * FROM oldsongs`;
    const songs = data.rows;
    return songs;
  } catch (error) {
    console.error(error);
    // throw new Error("Failed to fetch song data.");
    return [];
  }
}

export async function fetchSongsByUser() {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to perform this action");
  }
  noStore();
  try {
    const data =
      await sql<Song>`SELECT * FROM oldsongs WHERE user_id = ${session?.user?.id}`;
    const songs = data.rows;
    return songs;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user song data.");
  }
}

export async function fetchSongBySlug(slug: string) {
  noStore();
  try {
    const data = await sql<Song>`SELECT * FROM oldsongs WHERE slug = ${slug}`;
    const song = data.rows[0];
    return song;
  } catch (error) {
    throw new Error("Failed to fetch song from slug.");
  }
}
