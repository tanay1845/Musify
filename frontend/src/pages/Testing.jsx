import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router-dom";
import { useMusic } from "../context/MusicContext";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Heart,
  Shuffle,
  Repeat,
  Music,
  Menu,
  X,
  Home,
  Library,
  Settings,
  LogOut,
  Upload,
  List,
  User,
  Headphones
} from "lucide-react";

const AppLayout = () => {
  const { 
    allSong, 
    currentSong,
    isPlaying,
    togglePlay
  } = useMusic();
  
  const [isLiked, setIsLiked] = useState({});
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const audioRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const progressBarRef = useRef(null);

  // Handle audio time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeat) {
        audio.currentTime = 0;
        audio.play();
      } else if (isShuffle) {
        handleShuffleNext();
      } else {
        handleNext();
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeat, isShuffle]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handlePlayPause = () => {
    togglePlay();
  };

  const handlePrevious = () => {
    // Logic for previous song
    console.log("Previous song");
  };

  const handleNext = () => {
    // Logic for next song
    console.log("Next song");
  };

  const handleShuffleNext = () => {
    // Logic for shuffle next
    const randomIndex = Math.floor(Math.random() * allSong.length);
    // Update current song logic here
  };

  const handleLike = (songId) => {
    setIsLiked(prev => ({ ...prev, [songId]: !prev[songId] }));
  };

  const handleProgressClick = (e) => {
    if (!progressBarRef.current || !audioRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = x / width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Navigation items
  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/start-listening", icon: Library, label: "All Songs" },
    { path: "/upload-music-files", icon: Upload, label: "Upload" },
    { path: "/playlist", icon: List, label: "Playlist" },
    { path: "/my-playlist", icon: List, label: "My Playlist" },
    { path: "/user-profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Audio element */}
      <audio ref={audioRef} src={currentSong?.audioUrl} />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-indigo-600 p-2 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar - Always visible on large screens, toggle on mobile/tablet */}
      <div className={`
        fixed top-0 left-0 h-full w-64 bg-slate-900/95 backdrop-blur-xl border-r border-indigo-500/20
        transform transition-transform duration-300 ease-in-out z-40
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8 mt-4 lg:mt-0">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Headphones size={24} className="text-white" />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Musify
            </h2>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActivePath(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-indigo-600/20 border-l-4 border-indigo-400 text-indigo-200' 
                      : 'text-indigo-200/70 hover:bg-indigo-600/20 hover:text-indigo-200'
                    }
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-indigo-400' : ''} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-3 p-4 bg-indigo-900/30 rounded-xl border border-indigo-500/20">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold">U</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">User Name</p>
                <p className="text-xs text-indigo-300/60 truncate">View Profile</p>
              </div>
              <LogOut size={16} className="text-indigo-300/60 hover:text-indigo-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area - Changes based on route */}
      <div className={`
        transition-all duration-300 min-h-screen
        lg:ml-64
        ${currentSong ? 'pb-32' : 'pb-0'}
      `}>
        <Outlet />
      </div>

     
    </div>
  );
};

export default AppLayout;