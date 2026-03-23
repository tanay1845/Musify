import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ListMusic, 
  Music, 
  Play, 
  Clock, 
  Users,
  Sparkles,
  ChevronRight
} from "lucide-react";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);

  const navigate = useNavigate();

  const fetchPlaylist = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/playlist/get-playlists",
        { withCredentials: true }
      );
      
      // Log the response to see the structure
      console.log("Playlist response:", res.data);
      
      setPlaylist(res.data.playlist);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  // Get gradient based on index
  const getGradient = (index) => {
    const gradients = [
      "from-indigo-500 to-purple-600",
      "from-purple-500 to-pink-600",
      "from-violet-500 to-indigo-600",
      "from-indigo-600 to-blue-600",
      "from-purple-600 to-violet-600",
    ];
    return gradients[index % gradients.length];
  };

  // Calculate total songs across all playlists
  const totalSongs = playlist.reduce((acc, curr) => {
    // Check different possible field names for songs
    const songCount = curr.songs?.length || curr.songCount || curr.totalSongs || 0;
    return acc + songCount;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
                <ListMusic className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Your Playlists
                </h1>
                <p className="text-indigo-300/60 mt-1 flex items-center gap-2">
                  <Sparkles size={14} className="text-indigo-400" />
                  {playlist.length} {playlist.length === 1 ? 'playlist' : 'playlists'} available
                </p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-3">
            <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl px-4 py-2">
              <p className="text-xs text-indigo-400/60">Total Songs</p>
              <p className="text-xl font-bold text-white">{totalSongs}</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-sm border border-indigo-500/20 rounded-xl px-4 py-2">
              <p className="text-xs text-indigo-400/60">Playlists</p>
              <p className="text-xl font-bold text-white">{playlist.length}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Music size={24} className="text-indigo-400 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && playlist.length === 0 && (
          <div className="text-center py-20 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20">
            <div className="w-24 h-24 mx-auto bg-indigo-600/20 rounded-full flex items-center justify-center mb-4">
              <ListMusic size={40} className="text-indigo-400/60" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">No playlists yet</h3>
            <p className="text-indigo-300/60 mb-6">Create your first playlist to get started</p>
            <button
              onClick={() => navigate("/upload-music-files")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-500 hover:to-purple-500 rounded-full font-semibold transition-all
                       shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
            >
              <Play size={18} />
              Create Playlist
            </button>
          </div>
        )}

        {/* Playlist Grid */}
        {!loading && playlist.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlist.map((item, index) => {
              // Get song count - check multiple possible field names
              const songCount = item.songs?.length || item.songCount || item.totalSongs || 0;
              
              return (
                <div
                  key={item._id}
                  className="group relative bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl 
                           overflow-hidden transition-all duration-500 cursor-pointer
                           border border-indigo-500/20 hover:border-indigo-400/40
                           hover:shadow-2xl hover:shadow-indigo-600/20
                           transform hover:-translate-y-2"
                  onClick={() => navigate(`/${item.playListName?.toLowerCase().replace(/ /g, "-") || 'playlist'}`)}
                  onMouseEnter={() => setHoveredId(item._id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Thumbnail Container */}
                  <div className="relative h-48 overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-60`}></div>
                    
                    {/* Actual Thumbnail or Fallback */}
                    {item.playlistThumbnail ? (
                      <img
                        src={item.playlistThumbnail}
                        alt={item.playListName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ListMusic size={64} className="text-white/30" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 bg-black/40 flex items-center justify-center
                                    transition-opacity duration-300 ${hoveredId === item._id ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full 
                                    flex items-center justify-center transform scale-90 group-hover:scale-100 
                                    transition-transform shadow-xl shadow-indigo-600/50">
                        <Play size={28} className="text-white ml-1" />
                      </div>
                    </div>

                    {/* Playlist Info Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full 
                                     text-xs text-indigo-300 border border-indigo-500/30">
                        {songCount} {songCount === 1 ? 'song' : 'songs'}
                      </span>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-gradient-to-r from-indigo-600/80 to-purple-600/80 
                                     backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                        Playlist
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h2 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-indigo-400 transition-colors">
                          {item.playListName || "Untitled Playlist"}
                        </h2>
                        
                        {/* Metadata */}
                        <div className="flex items-center gap-3 text-xs text-indigo-300/60">
                          <span className="flex items-center gap-1">
                            <Clock size={12} className="text-indigo-400" />
                            {item.duration || `${songCount * 3} min`}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users size={12} className="text-indigo-400" />
                            {item.followers || Math.floor(Math.random() * 1000) + 100}
                          </span>
                        </div>
                      </div>

                      {/* Playlist Icon */}
                      <div className={`w-10 h-10 bg-gradient-to-br ${getGradient(index)} 
                                    rounded-xl flex items-center justify-center transition-all duration-300
                                    shadow-lg shadow-indigo-600/30 group-hover:scale-110`}>
                        <ListMusic size={18} className="text-white" />
                      </div>
                    </div>

                    {/* Created Date */}
                    {item.createdAt && (
                      <p className="text-xs text-indigo-400/40 mt-2">
                        Created {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    )}

                    {/* View Details Link */}
                    <div className="mt-3 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-indigo-400 flex items-center gap-1">
                        View Playlist
                        <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-indigo-400/50 pointer-events-none transition-all duration-300"></div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Spacing for PlayBar */}
        <div className="h-24"></div>
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

export default Playlist;