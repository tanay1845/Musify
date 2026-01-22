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
        "https://musify-liard-rho.vercel.app/api/v2/music/fetch-playlist",
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
    setAllSong(music);           
    setCurrentTrackIndex(index); 
  };

  return (
    <div className="min-h-screen bg-slate-800">
      <div>
        <p className="text-white font-bold p-3 text-4xl">
          {`${playlistName.charAt(0).toUpperCase()}${playlistName.slice(1).replace("-"," ")}`}</p>
      </div>
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
