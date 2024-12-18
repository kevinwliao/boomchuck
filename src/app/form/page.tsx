import SaveSongDialog from "@/app/form/saveSongDialog";
import { fetchSongs } from "@/lib/data";
import { db, users, accounts } from "@/schema";
import * as schema from "@/schema";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/vercel-postgres";

export default async function Page() {
  const data = await fetchSongs();

  return (
    <pre className="max-w-screen mx-6 text-wrap break-all">
      {JSON.stringify(data, null, "\t")}
    </pre>
  );
}
