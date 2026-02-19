import { useNavigate } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast"

const MusicFullScreen = () => {
  const { currentSong } = useMusic();
  const navigate = useNavigate();
  const [showList, setShowList] = useState(false)
  const [myPlayList, setMyPlayList] = useState([])
  const [selectPlayList, setSelectPlayList] = useState("")
  const [loading, setLoading] = useState(false)

  // console.log(currentSong)



  const fetchMyPlayList = async () => {
    const myList = await axios.get("http://localhost:3000/api/v1/playlist/get-my-playlist", { withCredentials: true })
    // console.log(myList.data)
    setMyPlayList(myList.data.myPlayList)
  }

  useEffect(() => {
    fetchMyPlayList()
  }, [])

  const showMyPlayList = async () => {
    if (myPlayList == 0) {
      navigate("/my-playlist")
      toast("Please create playlist first")
    } else {
      setShowList(true)
    }
  }

 const addSong = async () => {
  if (!selectPlayList) {
    toast.error("Please select playlist")
    return
  }

  try {
    setLoading(true)

    const res = await axios.post(
      "http://localhost:3000/api/v1/playlist/add-song",
      {
        playListId: selectPlayList,
        songId: currentSong._id
      },
      { withCredentials: true }
    )

    toast.success("Song added successfully 🎵")
    setShowList(false)
    setSelectPlayList("")

  } catch (error) {

    if (error.response?.status === 400) {
      toast("Song already in playlist 🎶", {
        icon: "⚠️"
      })
    } else {
      toast.error("Something went wrong")
    }

  } finally {
    setLoading(false)
  }
}



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
        <div className="absolute inset-0 bg-black" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex flex-col">

        {/* Top Bar */}
        <div className="flex justify-between items-center p-5 md:p-8">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-red-500 text-2xl transition cursor-pointer"
          >
            ✕
          </button>

          <h2 className="text-red-500 font-semibold text-sm md:text-base tracking-wider text-center">
            NOW PLAYING
          </h2>

          <div className="text-white font-bold cursor-pointer border-2 border-red-400 p-2 rounded-xl"
            onClick={() => showMyPlayList()}
          >
            + Add to Playlist

            <div className="">
              {
                showList ? (<div className="text-white flex flex-col gap-2">
                  <select name="playListName"
                    value={selectPlayList}
                    onChange={(e) => setSelectPlayList(e.target.value)}
                    className=" border-2 border-white bg-slate-500"
                  >
                    <option value="">Select Playlist</option>
                    {
                      myPlayList.map((item) => (
                        <option key={item._id} value={item._id} className="font-bold">
                          {item.myPlayListName}
                        </option>
                      ))
                    }
                  </select>
                  <button
                    onClick={addSong}
                    disabled={loading}
                    className="text-red-600 cursor-pointer rounded-xl font-bold bg-white border px-4 py-1 flex items-center justify-center"
                  >
                    {loading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"
                      />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>) : (<div>

                </div>)
              }
            </div>
          </div>

        </div>

        {/* Main Section */}
        <div className="
          flex flex-col items-center justify-center text-center px-6  md:gap-6 md:px-6"
        >
          {/* Album Art */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            className="
              w-72 h-72 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-red-500/40"
          >
            <img
              src={currentSong.thumbnail}
              alt={currentSong.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Song Info */}
          <div className="mt-8 md:mt-0 md:text-left max-w-full">

            <h1 className="
              text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center"
            >
              {currentSong.title}
            </h1>

            <p className="
              text-gray-300 text-sm sm:text-base md:text-lg mt-3 text-center"
            >
              {currentSong.artistName}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MusicFullScreen;
