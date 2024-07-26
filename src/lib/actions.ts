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

// export async function createSong2(formData?: FormData) {
//   // const validatedFields = CreateSong.safeParse({
//   //   name: formData.get("customerId"),
//   //   chords: formData.get("amount"),
//   // });

//   // if (!validatedFields.success) {
//   //   return {
//   //     errors: validatedFields.error.flatten().fieldErrors,
//   //     message: "Missing Fields. Failed to Create Invoice.",
//   //   };
//   // }

//   // const { name, chords } = validatedFields.data;
//   const name = "This is a name";
//   const chords: Chord[] = [
//     { root: "G", quality: "M" },
//     { root: "G", quality: "M" },
//     { root: "G", quality: "M" },
//     { root: "E", quality: "m" },
//     { root: "E", quality: "m" },
//     { root: "D", quality: "7" },
//     { root: "G", quality: "M" },
//   ];
//   const date = new Date().toISOString().split("T")[0];

//   try {
//     await sql`
//       INSERT INTO songs (name, chords, date)
//       VALUES (${name}, ${JSON.stringify(chords)}::JSONB, NOW())
//     `;
//   } catch (error) {
//     console.error(error);
//     return {
//       message: "Database Error: Failed to Create Song.",
//     };
//   }

//   revalidatePath("/data");
//   redirect("/data");
// }

// export async function clearSubmitted() {
//   try {
//     await sql`
//       DELETE FROM songs WHERE name = 'This is a name'
//     `;
//   } catch (error) {
//     console.error(error);
//     return {
//       message: "Database Error: Failed to Create Song.",
//     };
//   }

//   revalidatePath("/data");
//   redirect("/data");
// }
