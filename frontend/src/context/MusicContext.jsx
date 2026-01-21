import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [allSong, setAllSong] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v2/music/fetch");
        setAllSong(res.data.music);
      } catch (error) {
        console.error("Error fetching music", error);
      }
    };

    fetchMusic();
  }, []);


  return (
    <MusicContext.Provider
      value={{
        allSong,
        setAllSong,
        currentTrackIndex,
        setCurrentTrackIndex,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};


export const useMusic = () => useContext(MusicContext);
