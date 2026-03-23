import { useState } from "react";
import { useMusic } from "../context/MusicContext";
import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart, Search, MoreHorizontal } from "lucide-react";

const Checking = () => {
  const { allSong, setCurrentTrackIndex, setCurrentSong, currentSong, isPlaying } = useMusic();
  const navigate = useNavigate();

  const handleMusicClick = (index, id, song) => {
    setCurrentTrackIndex(index);
    setCurrentSong(song);
    navigate(`/music/${id}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-light">
      <div className="flex h-screen">
        {/* Minimal Sidebar */}
        <div className="w-64 bg-white border-r border-neutral-200 p-6 flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-medium tracking-tight">sonic.</h1>
            <p className="text-xs text-neutral-400 mt-1">music for the senses</p>
          </div>

          <nav className="space-y-1 flex-1">
            {[
              'Home', 'Explore', 'Library', 'Playlists', 'Favorites'
            ].map(item => (
              <button key={item} className="w-full text-left px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition">
                {item}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-neutral-200">
            <p className="text-xs text-neutral-400 mb-3">CURRENT PLAYLIST</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-neutral-200 rounded"></div>
              <div>
                <p className="text-sm font-medium">Evening Jazz</p>
                <p className="text-xs text-neutral-400">12 tracks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-32">
          {/* Header */}
          <header className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-neutral-200 z-10 px-8 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Good evening</h2>
              <div className="flex items-center gap-6">
                <Search size={18} className="text-neutral-400 hover:text-neutral-900 cursor-pointer" />
                <div className="w-8 h-8 bg-neutral-200 rounded-full"></div>
              </div>
            </div>
          </header>

          {/* Hero - Minimal */}
          <div className="px-8 py-6">
            <div className="aspect-[3/1] bg-neutral-100 rounded-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <p className="text-xs text-neutral-600 mb-1">FEATURED</p>
                <h3 className="text-3xl font-light mb-2">Minimal Sounds</h3>
                <p className="text-sm text-neutral-600">Curated for focus and relaxation</p>
              </div>
            </div>
          </div>

          {/* Recently Played */}
          <div className="px-8 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400">Recently played</h3>
              <button className="text-xs text-neutral-400 hover:text-neutral-900">View all</button>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-square bg-neutral-200 mb-2 relative">
                    <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition flex items-center justify-center">
                      <Play size={20} className="text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                  <p className="text-xs font-medium truncate">Track name {i}</p>
                  <p className="text-xs text-neutral-400 truncate">Artist</p>
                </div>
              ))}
            </div>
          </div>

          {/* Playlist Section */}
          <div className="px-8">
            <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400 mb-4">Today's picks</h3>
            <div className="space-y-2">
              {allSong.map((song, index) => (
                <div 
                  key={song._id}
                  onClick={() => handleMusicClick(index, song._id, song)}
                  className="flex items-center gap-4 p-2 hover:bg-neutral-100 rounded-sm group cursor-pointer transition"
                >
                  <span className="text-sm text-neutral-400 w-6 text-right">{index + 1}</span>
                  <img src={song.thumbnail} alt={song.title} className="w-10 h-10 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{song.title}</p>
                    <p className="text-xs text-neutral-400">{song.artistName}</p>
                  </div>
                  <span className="text-xs text-neutral-400">3:45</span>
                  <Heart size={16} className="text-neutral-300 hover:text-red-400 transition" />
                  <MoreHorizontal size={16} className="text-neutral-300 opacity-0 group-hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Now Playing - Minimal */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 px-8 py-3">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-4 w-1/4">
              <img src={currentSong.thumbnail} alt={currentSong.title} className="w-10 h-10 object-cover" />
              <div>
                <p className="text-sm font-medium">{currentSong.title}</p>
                <p className="text-xs text-neutral-400">{currentSong.artistName}</p>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-center gap-6 mb-2">
                <SkipBack size={18} className="text-neutral-400 hover:text-neutral-900 cursor-pointer" />
                <button className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-white hover:scale-105 transition">
                  {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
                </button>
                <SkipForward size={18} className="text-neutral-400 hover:text-neutral-900 cursor-pointer" />
              </div>
              <div className="h-0.5 bg-neutral-200">
                <div className="w-2/3 h-full bg-neutral-900"></div>
              </div>
            </div>

            <div className="w-1/4 flex justify-end items-center gap-3">
              <Volume2 size={18} className="text-neutral-400" />
              <div className="w-16 h-0.5 bg-neutral-200">
                <div className="w-3/4 h-full bg-neutral-900"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checking