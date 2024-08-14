"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { songSchema } from "@/lib/schemas";
import { Song } from "@/lib/schemas";
import { signIn, signOut, auth } from "@/auth";

export async function createSong(song: Song) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to perform this action");
  }
  const validatedFields = songSchema.safeParse(song);
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields",
    };
  }
  const { userId, name, measures, slug } = validatedFields.data;

  try {
    await sql`
      INSERT INTO songs (user_id, name, measures, slug)
      VALUES (${userId}, ${name}, ${JSON.stringify(measures)}::JSONB, ${slug})
    `;
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error: Failed to Create Song.",
    };
  }
  revalidatePath("/form");
  redirect("/form");
}

export async function updateSong(song: Song, id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to perform this action");
  }
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
  revalidatePath("/form");
  redirect("/form");
}

export async function deleteSong(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("You must be signed in to perform this action");
  }
  try {
    await sql`DELETE FROM songs WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Song." };
  }
  revalidatePath("/form");
  redirect("/form");
}

export async function signInAction() {
  await signIn();
}

export async function signOutAction() {
  await signOut();
}
