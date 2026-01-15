import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

const tracks = [
  {
    title: "Chill Vibes",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "Top Hits",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "EDM Party",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const PlayBar = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);

  const currentTrack = tracks[currentTrackIndex];

  // Handle Play / Pause
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Next Track
  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setIsPlaying(true);
  };

  // Handle Previous Track
  const handlePrev = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? tracks.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  // Handle Volume
  const handleVolumeChange = (e) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    audioRef.current.volume = vol;
  };

  // Handle Progress Update
  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    audio.addEventListener("timeupdate", updateProgress);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
    };
  }, []);

  // Auto play new track when index changes
  useEffect(() => {
    const audio = audioRef.current;
    audio.load();
    if (isPlaying) {
      audio.play();
    }
  }, [currentTrackIndex]);

  return (
    <div className="bg-[#1a1a1a] text-white p-4 flex flex-col md:flex-row items-center justify-between rounded-lg shadow-xl w-full mx-auto mt-10 fixed bottom-[2%]">
      {/* Track Info */}
      <div className="mb-3 md:mb-0 text-center md:text-left">
        <h3 className="text-lg font-semibold text-[#ff4b4b]">{currentTrack.title}</h3>
        <p className="text-sm text-gray-400">Demo Artist</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button onClick={handlePrev} className="hover:text-[#ff4b4b]">
          <SkipBack size={24} />
        </button>
        <button
          onClick={togglePlayPause}
          className="bg-[#8b0000] hover:bg-[#a52a2a] p-2 rounded-full transition"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={handleNext} className="hover:text-[#ff4b4b]">
          <SkipForward size={24} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 mt-3 md:mt-0">
        <Volume2 size={20} className="text-gray-400" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 accent-[#ff4b4b]"
        />
      </div>

      {/* Hidden Audio */}
      <audio ref={audioRef}>
        <source src={currentTrack.src} type="audio/mpeg" />
      </audio>

      {/* Progress Bar */}
      <div className="w-full mt-4">
        <div className="w-full bg-gray-700 h-2 rounded-full">
          <div
            className="bg-[#ff4b4b] h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PlayBar;
