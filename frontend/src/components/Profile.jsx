import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Play, Pause, Music } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Profile() {
  const [user, setUser] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  const navigate = useNavigate()

  const playlist = [
    {
      title: "Night Drive",
      artist: "Lofi Beats",
      src: "",
    },
    {
      title: "Chill Vibes",
      artist: "Synthwave",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
      title: "Morning Groove",
      artist: "Indie",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
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
      }
    };
    
    fetchUser();
  }, []);

  const handleLogout = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/user/logout", { withCredentials: true })
    console.log(res)
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
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* User Profile Section */}


        <div className="bg-gradient-to-r from-[#4a1c1c] to-[#3a1f0f] p-6 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between ">
          
          

          {user ? (<>
            <div className="flex items-center gap-6">
              <div className="w-28 h-28 bg-gray-800 rounded-full flex items-center justify-center text-4xl font-bold">
                {user ? user.username[0].toUpperCase() : "?"}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{user?.username || "Loading..."}</h2>
                <p className="text-gray-300">{user?.email}</p>
              </div>
            </div>
            <div className="font-bold cursor-pointer"
              onClick={handleLogout}
            >Logout</div>
          </>
          ) :  loading ? (
            <div className="">
              User not found please <Link to={"/login"} className="text-blue-400 underline">login</Link>
            </div> ) : ( 
            <div className="flex items-center justify-center">
            <div
              className="animate-spin rounded-full border-4 border-gray-300 border-t-[#ff4b4b]"
              style={{ width: 40, height: 40 }}
            />
          </div>  
          )
          }
        </div>


        {/* Playlist Section */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Music className="w-6 h-6 text-red-500" /> My Playlist
          </h3>
          <div className="space-y-3">
            {playlist.map((song, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#1e1e1e] p-3 rounded-lg hover:bg-[#2a2a2a] transition"
              >
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
                <button
                  onClick={() => handlePlayPause(song)}
                  className="bg-red-700 hover:bg-red-800 p-2 rounded-full transition"
                >
                  {currentSong?.src === song.src && isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Element */}
        {currentSong && (
          <audio
            ref={audioRef}
            src={currentSong.src}
            onEnded={() => setIsPlaying(false)}
          />
        )}
      </div>
    </div>
  );
}

export default Profile;
