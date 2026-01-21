import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "../SongCard";
import { useMusic } from "../../context/MusicContext";

function Masti() {
  const { setAllSong, setCurrentTrackIndex } = useMusic();

  const [music, setMusic] = useState([]);
  const { playlistName } = useParams();

  const playlist = playlistName?.split("-")[0];

  const fetchPlayListSongs = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v2/music/fetch-playlist",
        { playlist },
        { withCredentials: true }
      );

      setMusic(res.data.music);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlayListSongs();
  }, [playlist]);

  const handleSongClick = (index) => {
    setAllSong(music);           // 🔥 Replace global track list
    setCurrentTrackIndex(index); // ▶ Play selected song
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div className="flex flex-wrap gap-6 p-5">
        {music.map((song, index) => (
          <SongCard
            key={song._id}
            thumbnail={song.thumbnail}
            title={song.title}
            artist={song.artistName}
            onClick={() => handleSongClick(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Masti;
