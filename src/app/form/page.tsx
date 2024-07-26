import SaveSongDialog from "@/app/form/saveSongDialog";
import { fetchSongs } from "@/lib/data";

export default async function Page() {
  const data = await fetchSongs();
  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <SaveSongDialog></SaveSongDialog>
    </div>
  );
}
