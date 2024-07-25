import { fetchSongs } from "@/lib/data";
import DataButtons from "@/components/dataButtons";

export default async function DisplaySongs() {
  const songs = await fetchSongs();
  return (
    <div className="flex flex-col gap-12">
      <div>
        {songs.map((song) =>
          JSON.stringify(song, null, "\t").replaceAll('],\n\t"', '],\n\n\t"'),
        )}
      </div>

      <DataButtons></DataButtons>
    </div>
  );
}
