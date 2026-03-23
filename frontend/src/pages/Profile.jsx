import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Play, Pause, Music, LogOut, User, Heart, Clock, ListMusic } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userPlaylist, setUserPlaylist] = useState([])
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(null)
  const audioRef = useRef(null);

  const navigate = useNavigate()

  const playlist = [
    {
      title: "Night Drive",
      artist: "Lofi Beats",
      duration: "3:45",
      src: "",
    },
    {
      title: "Chill Vibes",
      artist: "Synthwave",
      duration: "4:20",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
 
  ];

  // Fetch Current User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const res = await axios.get("http://localhost:3000/api/v1/user/current-user", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setLoading(false)
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setLoading(false)
      }
    };
    
    fetchUser();

    const fetchLikedSong = async() => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/user/fetch-like",{withCredentials:true})
        // console.log(res.data.songs.length)
        setLikeCount(res.data.user.likes.length)
      } catch (error) {
        console.error(error)
      }
    }
    fetchLikedSong()

  }, []);

  useEffect(() => {
    const fetchUserPlaylist = async() => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/playlist/get-my-playlist",{withCredentials:true})
        // console.log(res.data.myPlayList)
        setUserPlaylist(res.data.myPlayList)
      } catch (error) {
        console.error(error)
      }
    }

    fetchUserPlaylist()
  },[])

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/user/logout", { withCredentials: true })
    console.log(res)
    toast.success("Logged out successfully")
    navigate("/login")
  }

  // Handle Play / Pause
  const handlePlayPause = (song) => {
    if (currentSong?.src === song.src) {
      // Pause current song
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      // New song selected
      setCurrentSong(song);
      setIsPlaying(true);
      setTimeout(() => {
        audioRef.current.play();
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-10">
        {/* User Profile Section */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-indigo-500/20 p-8 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between relative overflow-hidden group">
          {/* Gradient border effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {user ? (
            <>
              <div className="flex items-center gap-6 relative">
                <div className="relative">
                  <div className="w-24 h-24 md:w-28 md:h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold shadow-xl shadow-indigo-600/30">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-900"></div>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {user.username}
                  </h2>
                  <p className="text-indigo-300/70 flex items-center gap-2 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                    {user.email}
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs bg-indigo-600/20 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/30">
                      Listener
                    </span>
                    <span className="text-xs bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full border border-purple-500/30">
                      128 Followers
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 hover:from-indigo-600 hover:to-purple-600 border border-indigo-500/30 hover:border-transparent rounded-full font-medium transition-all duration-300 group"
              >
                <LogOut size={18} className="group-hover:rotate-180 transition-transform duration-300" />
                <div>Logout</div>
              </button>
            </>
          ) : loading ? (
            <div className="flex items-center justify-center w-full py-12">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Music size={24} className="text-indigo-400 animate-pulse" />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center w-full py-12">
              <div className="text-center">
                <User size={48} className="mx-auto text-indigo-500/50 mb-4" />
                <p className="text-indigo-300/70 mb-4">User not found</p>
                <Link 
                  to={"/login"} 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full font-medium hover:from-indigo-500 hover:to-purple-500 transition-all"
                >
                  Login to continue
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        {user && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "Playlists", value: userPlaylist.length || "No PlayList Created", icon: ListMusic, color: "from-indigo-500 to-indigo-600" },
              { label: "Favorite Songs", value: likeCount || "No like", icon: Heart, color: "from-purple-500 to-purple-600" },
              { label: "Listening Time", value: "128h", icon: Clock, color: "from-pink-500 to-pink-600" },
              { label: "Artists", value: "24", icon: Music, color: "from-violet-500 to-violet-600" },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-slate-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-4 hover:border-indigo-400/40 transition-all group">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-indigo-300/60">{stat.label}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Playlist Section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold flex items-center gap-2">
              <Music className="w-6 h-6 text-indigo-400" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                My Playlist
              </span>
            </h3>
            <span className="text-sm text-indigo-300/60">{playlist.length} songs</span>
          </div>


          <div className="bg-slate-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-2xl overflow-hidden">
            {/* Playlist Header - Hidden on mobile */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-indigo-950/50 border-b border-indigo-500/20 text-xs text-indigo-300/60">
              <div className="col-span-1">#</div>
              <div className="col-span-5">TITLE</div>
              <div className="col-span-4">ARTIST</div>
              <div className="col-span-1">DURATION</div>
              <div className="col-span-1"></div>
            </div>


            {/* Playlist Items */}
            <div className="divide-y divide-indigo-500/10">
              {playlist.map((song, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-4 md:px-6 py-4 hover:bg-indigo-600/10 transition-all group"
                >
                  {/* Mobile Layout */}
                  <div className="flex items-center justify-between md:hidden">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg flex items-center justify-center">
                        <Music size={16} className="text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{song.title}</p>
                        <p className="text-sm text-indigo-300/60">{song.artist}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayPause(song)}
                      className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all shadow-lg shadow-indigo-600/30"
                    >
                      {currentSong?.src === song.src && isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5 ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex md:col-span-1 items-center text-indigo-300/60">
                    {index + 1}
                  </div>
                  <div className="hidden md:block md:col-span-5 font-medium text-white">
                    {song.title}
                  </div>
                  <div className="hidden md:block md:col-span-4 text-indigo-300/60">
                    {song.artist}
                  </div>
                  <div className="hidden md:block md:col-span-1 text-sm text-indigo-300/40">
                    {song.duration}
                  </div>
                  <div className="hidden md:block md:col-span-1">
                    <button
                      onClick={() => handlePlayPause(song)}
                      className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg shadow-indigo-600/30"
                    >
                      {currentSong?.src === song.src && isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4 ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Playing Indicator */}
                  {currentSong?.src === song.src && isPlaying && (
                    <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-r-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recently Played Section */}
        {user && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-300">
              <Clock size={18} className="text-indigo-400" />
              Recently Played
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {playlist.slice(0, 4).map((song, index) => (
                <div key={index} className="bg-slate-900/30 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-3 hover:border-indigo-400/40 transition-all group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-lg mb-2 flex items-center justify-center">
                    <Music size={24} className="text-indigo-400/60 group-hover:text-indigo-400 transition-colors" />
                  </div>
                  <p className="font-medium text-sm truncate">{song.title}</p>
                  <p className="text-xs text-indigo-300/60 truncate">{song.artist}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio Element */}
        {currentSong && (
          <audio
            ref={audioRef}
            src={currentSong.src}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>

      {/* Animation Styles */}
      <style >{`
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

export default Profile;