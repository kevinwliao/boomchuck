"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { songSchema } from "@/lib/schemas";
import { Song } from "@/lib/schemas";

export async function createSong(song: Song) {
  // const validatedFields = songSchema.safeParse(song);

  // if (!validatedFields.success) {
  //   return {
  //     errors: validatedFields.error.flatten().fieldErrors,
  //     message: "Missing Fields",
  //   };
  // }

  // const { userId, name, measures } = validatedFields.data;
  const { userId, name, measures } = song;

  try {
    await sql`
      INSERT INTO songs (user_id, name, measures)
      VALUES (${userId}, ${name}, ${JSON.stringify(measures)}::JSONB)
    `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Song.",
    };
  }
}

export async function updateSong(song: Song, id: string) {
  const { measures } = song;

  try {
    await sql`
      INSERT INTO songs (measures)
      VALUES (${JSON.stringify(measures)}::JSONB)
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Song.",
    };
  }
}

export async function deleteSong(id: string) {
  try {
    await sql`DELETE FROM songs WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Song." };
  }
}
