import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SongCard from "../SongCard";
import { useMusic } from "../../context/MusicContext";
import { Music, Play, Clock, Users, Heart, ListMusic } from "lucide-react";

function Masti() {
  const { setAllSong, setCurrentTrackIndex } = useMusic();
  const [music, setMusic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playlistInfo, setPlaylistInfo] = useState({
    totalDuration: "0 min",
    songCount: 0,
    followers: "1.2k"
  });
  
  const { playlistName } = useParams();
  const playlist = playlistName?.split("-")[0];

  const fetchPlayListSongs = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v2/music/fetch-playlist",
        { playlist },
        { withCredentials: true }
      );

      setMusic(res.data.music);
      
      // Calculate total duration (mock data - replace with actual if available)
      const totalMins = res.data.music.length * 3; // Assuming 3 min per song average
      setPlaylistInfo({
        totalDuration: `${totalMins} min`,
        songCount: res.data.music.length,
        followers: "1.2k"
      });
      
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayListSongs();
  }, [playlist]);

  const handleSongClick = (index) => {
    setAllSong(music);           
    setCurrentTrackIndex(index); 
  };

  // Format playlist name for display
  const formatPlaylistName = (name) => {
    if (!name) return "";
    return name
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const displayName = formatPlaylistName(playlistName);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Music size={30} className="text-indigo-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section with Gradient */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10">
          <div className="flex items-end gap-6">
            {/* Playlist Icon */}
            <div className="w-24 h-24 md:w-36 md:h-36 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <ListMusic size={40} className="text-white/90 md:w-16 md:h-16" />
            </div>
            
            {/* Playlist Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-600/20 px-3 py-1 rounded-full border border-indigo-500/30">
                  Playlist
                </span>
                {music.length > 0 && (
                  <span className="text-xs text-indigo-300/60 flex items-center gap-1">
                    <Users size={12} /> {playlistInfo.followers} followers
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
                {displayName}
              </h1>
              
              {music.length > 0 && (
                <div className="flex items-center gap-4 text-sm text-indigo-300/60">
                  <span className="flex items-center gap-1">
                    <Music size={14} className="text-indigo-400" />
                    {playlistInfo.songCount} songs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} className="text-indigo-400" />
                    {playlistInfo.totalDuration}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Empty State */}
        {music.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20">
            <div className="w-24 h-24 mx-auto bg-indigo-600/20 rounded-full flex items-center justify-center mb-4">
              <Music size={40} className="text-indigo-400/60" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">No songs in this playlist yet</h3>
            <p className="text-indigo-300/60">Check back later for new additions!</p>
          </div>
        ) : (
          <>
            {/* Play All Button */}
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => handleSongClick(0)}
                className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-6 py-3 rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transform hover:scale-105"
              >
                <Play size={20} fill="white" />
                Play All
              </button>
              
              <button className="p-3 bg-indigo-600/20 hover:bg-indigo-600/30 rounded-full transition-all border border-indigo-500/30">
                <Heart size={20} className="text-indigo-400" />
              </button>
            </div>

            {/* Song Count Header */}
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-lg font-semibold text-indigo-200">
                All Songs <span className="text-indigo-400/60 text-sm ml-2">({music.length} tracks)</span>
              </h2>
              
              {/* Sort Options - Can be enhanced later */}
              <select className="bg-slate-800/50 border border-indigo-500/30 rounded-lg px-3 py-1.5 text-sm text-indigo-200 focus:outline-none focus:border-indigo-400">
                <option>Recently Added</option>
                <option>A-Z</option>
                <option>Artist</option>
              </select>
            </div>

            {/* Song Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {music.map((song, index) => (
                <div key={song._id} className="group relative">
                  <SongCard
                    thumbnail={song.thumbnail}
                    title={song.title}
                    artist={song.artistName}
                    onClick={() => handleSongClick(index)}
                    duration={song.duration || "3:45"} // Add duration if available
                  />
                  
                  {/* Quick Action Buttons */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full hover:bg-indigo-600 transition-colors">
                      <Heart size={14} className="text-white" />
                    </button>
                    <button className="p-1.5 bg-black/40 backdrop-blur-sm rounded-full hover:bg-indigo-600 transition-colors">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>

                  {/* Index Number - For Desktop */}
                  <div className="hidden lg:block absolute top-2 left-2 text-xs font-bold text-indigo-400/60 bg-black/40 backdrop-blur-sm px-2 py-1 rounded">
                    #{index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Spacing for PlayBar */}
            <div className="h-24"></div>
          </>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Masti;