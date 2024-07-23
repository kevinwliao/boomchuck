"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  id: z.string(),
  name: z.string(),
  chords: z.array(z.object({ root: z.string(), quality: z.string() })),
  date: z.string(),
});

const CreateSong = FormSchema.omit({ id: true, date: true });

export async function createSong(formData: FormData) {
  const validatedFields = CreateSong.safeParse({
    name: formData.get("customerId"),
    chords: formData.get("amount"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  const { name, chords } = validatedFields.data;
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
      INSERT INTO invoices (name, chords)
      VALUES (${name}, ${JSON.stringify(chords)}::JSONB[], ${date})
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Song.",
    };
  }

  revalidatePath("/app");
  redirect("/app");
}
