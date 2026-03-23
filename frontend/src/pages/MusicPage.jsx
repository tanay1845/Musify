import { useState, useEffect } from "react";
import { useMusic } from "../context/MusicContext";
import SongCard from "../components/SongCard";
import { useNavigate } from "react-router-dom";
import {
  Music,
  Search,
  Sliders,
  ListMusic,
  Heart
} from "lucide-react";
import axios from "axios";

const MusicView = () => {
  const {
    allSong,
    setCurrentTrackIndex,
    setCurrentSong
  } = useMusic();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [likedSongs, setLikedSongs] = useState([]);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // 🔍 Filter songs
  useEffect(() => {
    if (!allSong) return;

    if (searchTerm.trim() === "") {
      setFilteredSongs(allSong);
    } else {
      const filtered = allSong.filter(song =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artistName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchTerm, allSong]);

  // 🎵 Play music
  const handleMusicClick = (index, id, song) => {
    setCurrentTrackIndex(index);
    setCurrentSong(song);
    navigate(`/music/${id}`);
  };

  // 👤 Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/current-user",
          { withCredentials: true }
        );
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, []);

  // ❤️ Fetch liked songs
  useEffect(() => {
    const fetchLikedSong = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/user/fetch-like",
          { withCredentials: true }
        );

        // ✅ handle both populated & non-populated
        const likedIds = res.data.user.likes.map((item) =>
          typeof item === "object" ? item._id : item
        );

        setLikedSongs(likedIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLikedSong();
  }, []);

  // ❤️ Like / Unlike (Optimistic UI)
  const handleLike = async (songId) => {
    // optimistic update
    setLikedSongs((prev) =>
      prev.includes(songId)
        ? prev.filter((id) => id !== songId)
        : [...prev, songId]
    );

    try {
      await axios.post(
        "http://localhost:3000/api/v1/user/add-like",
        { songId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);

      // rollback if API fails
      setLikedSongs((prev) =>
        prev.includes(songId)
          ? prev.filter((id) => id !== songId)
          : [...prev, songId]
      );
    }
  };

  return (
    <div className="min-h-full">
      {/* HEADER */}
      <div className="relative h-56 md:h-72 bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-8">
          <div className="flex items-end gap-4 md:gap-6">
            <div className="w-20 h-20 md:w-40 md:h-40 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Music size={30} className="text-white/80 md:w-[60px] md:h-[60px]" />
            </div>

            <div className="flex-1">
              <p className="text-xs md:text-sm text-indigo-300 mb-2">
                Playlist
              </p>

              <h1 className="text-2xl md:text-5xl font-bold text-white">
                My Music Library
              </h1>

              <p className="text-xs md:text-sm text-indigo-200/80">
                {filteredSongs.length} songs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="sticky top-0 z-20 bg-slate-900 px-4 md:px-8 py-4">
        <div className="flex gap-4 max-w-7xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" />
            <input
              type="text"
              placeholder="Search songs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800 rounded-full py-3 pl-12 pr-4 text-white"
            />
          </div>

          <button className="p-3 bg-indigo-600/20 rounded-full">
            <Sliders size={20} />
          </button>
        </div>
      </div>

      {/* SONG GRID */}
      <div className="p-4 md:p-8">
        {filteredSongs.length === 0 ? (
          <p className="text-center text-gray-400">No songs found</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredSongs.map((song, index) => (
              <div key={song._id} className="relative group">
                <SongCard
                  thumbnail={song.thumbnail}
                  title={song.title}
                  artist={song.artistName}
                  onClick={() => handleMusicClick(index, song._id, song)}
                />

                {/* ❤️ LIKE BUTTON */}
                <button
                  onClick={() => handleLike(song._id)}
                  className="absolute top-2 right-2 p-2 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <Heart
                    size={16}
                    className={`transition duration-200 ${
                      likedSongs.some(id => id === song._id)
                        ? "fill-red-500 text-red-500 scale-110"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicView;