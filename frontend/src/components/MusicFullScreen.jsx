import { useNavigate } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { 
  X, 
  Plus, 
  Check, 
  AlertCircle,
  ListMusic,
  ChevronDown,
  ChevronUp,
  Disc3,
  Music2
} from "lucide-react";

const MusicFullScreen = () => {
  const { currentSong } = useMusic();
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false);
  const [myPlayList, setMyPlayList] = useState([]);
  const [selectPlayList, setSelectPlayList] = useState("");
  const [loading, setLoading] = useState(false);
  const [addedSongs, setAddedSongs] = useState({});

  const fetchMyPlayList = async () => {
    try {
      const myList = await axios.get(
        "http://localhost:3000/api/v1/playlist/get-my-playlist", 
        { withCredentials: true }
      );
      setMyPlayList(myList.data.myPlayList);
      
      // Check which playlists already contain this song
      const addedStatus = {};
      myList.data.myPlayList.forEach(playlist => {
        if (playlist.songs?.some(song => song._id === currentSong?._id)) {
          addedStatus[playlist._id] = true;
        }
      });
      setAddedSongs(addedStatus);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentSong) {
      fetchMyPlayList();
    }
  }, [currentSong]);

  const showMyPlayList = async () => {
    if (myPlayList.length === 0) {
      navigate("/my-playlist");
      toast("Please create a playlist first", {
        icon: "🎵",
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
    } else {
      setShowList(!showList);
    }
  };

  const addSong = async () => {
    if (!selectPlayList) {
      toast.error("Please select a playlist", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/playlist/add-song",
        {
          playListId: selectPlayList,
          songId: currentSong._id
        },
        { withCredentials: true }
      );

      toast.success("Song added successfully! 🎵", {
        style: {
          background: '#1e1b4b',
          color: '#fff',
          border: '1px solid rgba(129, 140, 248, 0.2)',
        }
      });
      
      setAddedSongs(prev => ({ ...prev, [selectPlayList]: true }));
      setShowList(false);
      setSelectPlayList("");

    } catch (error) {
      if (error.response?.status === 400) {
        toast("Song already in playlist", {
          icon: "🎶",
          style: {
            background: '#1e1b4b',
            color: '#fff',
            border: '1px solid rgba(129, 140, 248, 0.2)',
          }
        });
      } else {
        toast.error("Something went wrong", {
          style: {
            background: '#1e1b4b',
            color: '#fff',
            border: '1px solid rgba(129, 140, 248, 0.2)',
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!currentSong) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Background Blur */}
      <div className="absolute inset-0">
        <img
          src={currentSong.thumbnail}
          alt=""
          className="w-full h-full object-cover blur-3xl scale-110 opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/30 to-slate-950" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between items-center p-5 md:p-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-slate-900/50 backdrop-blur-xl border border-indigo-500/30 
                     rounded-full flex items-center justify-center text-indigo-300 
                     hover:text-indigo-400 hover:border-indigo-400 transition-all cursor-pointer"
          >
            <X size={20} />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2"
          >
            <Disc3 size={16} className="text-indigo-400 animate-spin-slow" />
            <h2 className="text-indigo-400 font-semibold text-sm md:text-base tracking-wider">
              NOW PLAYING
            </h2>
          </motion.div>

          {/* Add to Playlist Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={showMyPlayList}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600/20 
                       to-purple-600/20 hover:from-indigo-600 hover:to-purple-600 
                       border border-indigo-500/30 hover:border-transparent
                       rounded-xl transition-all duration-300 text-indigo-300 
                       hover:text-white font-medium"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add to Playlist</span>
              {showList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.button>

            {/* Playlist Dropdown */}
            <AnimatePresence>
              {showList && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl 
                           border border-indigo-500/20 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="p-3 border-b border-indigo-500/20">
                    <h3 className="text-sm font-semibold text-indigo-300 flex items-center gap-2">
                      <ListMusic size={14} className="text-indigo-400" />
                      Select Playlist
                    </h3>
                  </div>

                  <div className="p-3">
                    <select
                      value={selectPlayList}
                      onChange={(e) => setSelectPlayList(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-800/50 border border-indigo-500/30 
                               rounded-lg text-white text-sm focus:outline-none 
                               focus:ring-2 focus:ring-indigo-500 mb-3"
                    >
                      <option value="" className="bg-slate-800">Choose a playlist</option>
                      {myPlayList.map((item) => (
                        <option 
                          key={item._id} 
                          value={item._id}
                          className="bg-slate-800"
                        >
                          {item.myPlayListName} {addedSongs[item._id] ? "✓" : ""}
                        </option>
                      ))}
                    </select>

                    {selectPlayList && addedSongs[selectPlayList] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mb-3 p-2 bg-indigo-600/20 border border-indigo-500/30 
                                 rounded-lg flex items-center gap-2 text-xs text-indigo-300"
                      >
                        <Check size={12} className="text-indigo-400" />
                        Already in this playlist
                      </motion.div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={addSong}
                      disabled={loading || !selectPlayList || addedSongs[selectPlayList]}
                      className={`w-full py-2 rounded-lg font-medium flex items-center justify-center gap-2
                                transition-all ${
                        loading || !selectPlayList || addedSongs[selectPlayList]
                          ? 'bg-slate-800/50 text-indigo-400/50 cursor-not-allowed'
                          : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-600/30'
                      }`}
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          />
                          Adding...
                        </>
                      ) : addedSongs[selectPlayList] ? (
                        <>
                          <Check size={16} />
                          Already Added
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          Add to Playlist
                        </>
                      )}
                    </motion.button>
                  </div>

                  {myPlayList.length === 0 && (
                    <div className="p-4 text-center">
                      <Music2 size={32} className="mx-auto text-indigo-400/30 mb-2" />
                      <p className="text-xs text-indigo-300/60">No playlists yet</p>
                      <button
                        onClick={() => navigate("/my-playlist")}
                        className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 underline"
                      >
                        Create one
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-6xl">
            
            {/* Album Art with Rotating Animation */}
            <motion.div
              initial={{ scale: 0.9, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="relative"
            >
              {/* Vinyl Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-4 border-indigo-500/20 
                         border-t-indigo-500 border-b-purple-500"
              />
              
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] 
                            rounded-3xl overflow-hidden shadow-2xl border-2 border-indigo-500/40
                            transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src={currentSong.thumbnail}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Song Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center md:text-left max-w-md"
            >
              {/* Track Number Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600/20 
                            border border-indigo-500/30 rounded-full mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
                <span className="text-xs text-indigo-300">NOW PLAYING</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3
                           bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                           bg-clip-text text-transparent">
                {currentSong.title}
              </h1>

              <p className="text-indigo-300/80 text-lg sm:text-xl mb-6">
                {currentSong.artistName}
              </p>

              {/* Additional Info */}
              <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-indigo-400/60">
                <span className="flex items-center gap-1">
                  <Disc3 size={14} />
                  Studio Quality
                </span>
                <span className="w-1 h-1 rounded-full bg-indigo-400/40"></span>
                <span className="flex items-center gap-1">
                  <Music2 size={14} />
                  {currentSong.genre || "Pop"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
      </div>
    </motion.div>
  );
};

export default MusicFullScreen;