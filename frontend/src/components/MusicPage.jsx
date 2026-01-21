import { useMusic } from "../context/MusicContext";
import SongCard from "./SongCard";

const MusicView = () => {
  const { allSong, setCurrentTrackIndex } = useMusic();

  return (
    <div className="min-h-screen bg-slate-800">

      <div className="flex flex-wrap gap-6 p-5">
        {allSong.map((song, index) => (
          <SongCard
            key={song._id}
            thumbnail={song.thumbnail}
            title={song.title}
            artist={song.artistName}
            onClick={() => setCurrentTrackIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicView;
