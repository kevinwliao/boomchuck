import SaveSongDialog from "@/app/form/saveSongDialog";
import { fetchSongs } from "@/lib/data";

export default async function Page() {
  const data = await fetchSongs();
  return (
    <div>
      <pre>{JSON.stringify(data, null, "\t")}</pre>
      <SaveSongDialog></SaveSongDialog>
    </div>
  );
}
