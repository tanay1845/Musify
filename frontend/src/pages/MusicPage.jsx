import { useMusic } from "../context/MusicContext";
import SongCard from "../components/SongCard";
import { useNavigate } from "react-router-dom";

const MusicView = () => {
  const { allSong, setCurrentTrackIndex, setCurrentSong  } = useMusic();
  const navigate = useNavigate()

  const handleMusicClick = (index,id,song) => {
    setCurrentTrackIndex(index)
    setCurrentSong(song)
    navigate(`/music/${id}`)
  }

  return (
    <div className="min-h-screen bg-slate-800">

      <div className="flex flex-wrap gap-6 p-5 pb-48">
        {allSong.map((song, index) => (
          <SongCard
            key={song._id}
            thumbnail={song.thumbnail}
            title={song.title}
            artist={song.artistName}
            onClick={() => handleMusicClick(index,song._id,song)}
          />
        ))}
      </div>
    </div>
  );
};

export default MusicView;
