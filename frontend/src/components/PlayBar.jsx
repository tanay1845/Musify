import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { useMusic } from "../context/MusicContext";
import axios from "axios";
import toast from "react-hot-toast";

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds === Infinity) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

const PlayBar = () => {
  const { allSong: tracks, currentTrackIndex, setCurrentTrackIndex , setCurrentSong } = useMusic();

  const [user, setUser] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const currentTrack = tracks?.[currentTrackIndex];




  // If User then show playbar
  const fetchCurrentUser = async() => {
    await axios.get("http://localhost:3000/api/v1/user/current-user",{withCredentials:true})
    setUser(true)
  }

    useEffect(() => {
      fetchCurrentUser()
    },[isPlaying])

  /* ================================
     1. Track Change + Auto Play
  ================================= */
  useEffect(() => {
    if (!audioRef.current || !currentTrack?.url) return;

    const audio = audioRef.current;
    audio.src = currentTrack.url;
    audio.load();

    // console.log("pb",currentTrack)
    setCurrentSong(currentTrack)
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [currentTrackIndex, currentTrack?.url]);

  /* ================================
     2. Play / Pause Toggle
  ================================= */
  const togglePlayPause = async () => {
    if(!user){
      toast.error("Please Login")
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  };

  /* ================================
     3. Next / Prev
  ================================= */
  const handleNext = () => {
    if (!tracks.length) return;
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const handlePrev = () => {
    if (!tracks.length) return;
    setCurrentTrackIndex((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    );
  };

  /* ================================
     4. Progress Handling
  ================================= */
  const updateProgress = () => {
    const audio = audioRef.current;
    if (!audio || isDragging) return;

    setCurrentTime(audio.currentTime);
    setDuration(audio.duration);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleProgressClick = (e) => {
    if (!duration || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;

    audioRef.current.currentTime = newTime;
  };

  if (!currentTrack) return null;

  return (
    <div className="flex justify-center items-center ">
  <div className="bg-slate-900/95 backdrop-blur-xl text-white p-3 flex flex-col md:flex-row items-center justify-around shadow-xl w-[95vw] fixed md:top-[83%] top-[75%] z-50 border border-indigo-500/20">

    {/* Track Info */}
    <div className="flex-1 min-w-[150px]">
      <h3 className="text-lg font-semibold text-indigo-400 truncate max-w-[300px]">
        {currentTrack.title}
      </h3>
      <p className="text-sm text-indigo-300/60 truncate max-w-[200px]">
        {currentTrack.artistName || "Unknown Artist"}
      </p>
    </div>

    {/* Controls */}
    <div className="flex-1 md:min-w-[400px] max-w-2xl w-full">
      <div className="flex items-center justify-center gap-6 mb-3">
        <button onClick={handlePrev} className="cursor-pointer text-indigo-300/60 hover:text-indigo-400 transition-colors">
          <SkipBack size={24} />
        </button>

        <button
          onClick={togglePlayPause}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 p-3 rounded-full cursor-pointer hover:from-indigo-500 hover:to-purple-500 transition-all shadow-lg shadow-indigo-600/30"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} />}
        </button>

        <button onClick={handleNext} className="cursor-pointer text-indigo-300/60 hover:text-indigo-400 transition-colors">
          <SkipForward size={24} />
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 cursor-pointer">
        <span className="text-xs w-10 text-right text-indigo-300/60">
          {formatTime(currentTime)}
        </span>

        <div
          ref={progressBarRef}
          className="flex-1 bg-indigo-900/30 h-1.5 rounded-full cursor-pointer"
          onClick={handleProgressClick}
        >
          <div
            className="bg-gradient-to-r from-indigo-400 to-purple-400 h-full rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="text-xs w-10 text-indigo-300/60">
          {formatTime(duration)}
        </span>
      </div>
    </div>

    {/* Volume */}
    <div className="flex items-center gap-3 flex-1 justify-end min-w-[150px] cursor-pointer sm:fix text-indigo-300/60">
      <Volume2 size={18} className="hover:text-indigo-400 transition-colors" />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => {
          const v = Number(e.target.value);
          setVolume(v);
          audioRef.current.volume = v;
        }}
        className="w-24 accent-indigo-500 bg-indigo-900/30 rounded-lg"
      />
    </div>

    {/* Audio */}
    {user &&
    <audio
      ref={audioRef}
      preload="metadata"
      onTimeUpdate={updateProgress}
      onLoadedMetadata={(e) => setDuration(e.target.duration)}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      onEnded={handleNext}
    />
    }
  </div>
</div>
  );
};

export default PlayBar;
