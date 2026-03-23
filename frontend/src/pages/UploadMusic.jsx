import axios from "axios";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Music2,
  User,
  ListMusic,
  Image as ImageIcon,
  Upload,
  Disc3,
  Loader2,
  Plus,
  ChevronRight,
  Play,
  Sparkles,
  Mic2,
  Album,
  Headphones
} from "lucide-react";
import AddPlaylist from "../components/AddPlaylist";
import Add_Artist from "./Add_Artist";

export default function UploadMusic() {
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [playList, setPlayList] = useState("");
  const [audio, setAudio] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playListName, setPlayListName] = useState([]);
  const [audioPreview, setAudioPreview] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState({ image: false, audio: false });

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artistName", artistName);
      formData.append("playList", playList);
      formData.append("thumbnail", thumbnail);
      formData.append("audio", audio);

      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v2/music/store",
        formData,
        {
          withCredentials: true,
        }
      );

      toast.success("✨ Music uploaded successfully!");

      // Reset form
      setTitle("");
      setArtistName("");
      setPlayList("");
      setThumbnail(null);
      setAudio(null);
      setAudioPreview(null);
      setImagePreview(null);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload music. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPlaylistNames = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/v1/playlist/get-playlists",
          { withCredentials: true }
        );
        setPlayListName(res.data.playlist);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load playlists");
      }
    };
    fetchPlaylistNames();
  }, []);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (type === 'audio') {
      setAudio(file);
      setAudioPreview(URL.createObjectURL(file));
    } else {
      setThumbnail(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e, type, isDragging) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: isDragging }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [type]: false }));

    const file = e.dataTransfer.files[0];
    if (file) {
      if (type === 'audio' && file.type.startsWith('audio/')) {
        setAudio(file);
        setAudioPreview(URL.createObjectURL(file));
      } else if (type === 'image' && file.type.startsWith('image/')) {
        setThumbnail(file);
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 pb-24">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Disc3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Music Dashboard
              </h1>
              <p className="text-indigo-300/60 mt-1 flex items-center gap-2">
                <Sparkles size={14} className="text-indigo-400" />
                Upload and manage your music collection
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Upload Form */}
          <div className="flex-1">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-5">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload New Music
                </h2>
                <p className="text-indigo-100 text-sm mt-1 opacity-90">
                  Fill in the details and upload your track
                </p>
              </div>

              <form onSubmit={onSubmitHandler} className="p-6 space-y-6">
                {/* Title Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                    <Music2 className="w-4 h-4 text-indigo-400" />
                    Song Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Midnight Dreams"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200 placeholder:text-indigo-300/30 text-white"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                {/* Artist Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                    <User className="w-4 h-4 text-indigo-400" />
                    Artist Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., The Weeknd"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl 
                             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                             transition-all duration-200 placeholder:text-indigo-300/30 text-white"
                    value={artistName}
                    onChange={(e) => setArtistName(e.target.value)}
                    required
                  />
                </div>

                {/* Playlist Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                    <ListMusic className="w-4 h-4 text-indigo-400" />
                    Select Playlist
                  </label>
                  <div className="relative">
                    <select
                      value={playList}
                      onChange={(e) => setPlayList(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-indigo-500/30 rounded-xl 
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                               transition-all duration-200 appearance-none cursor-pointer
                               text-white font-medium"
                    >
                      <option value="" className="bg-slate-800 text-indigo-300/60">Choose a playlist</option>
                      {playListName.map((item) => (
                        <option
                          key={item._id}
                          value={item.playListName}
                          className="bg-slate-800 text-white py-2"
                        >
                          {item.playListName}
                        </option>
                      ))}
                    </select>

                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 text-indigo-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Optional: Show message if no playlists exist */}
                  {playListName.length === 0 && (
                    <p className="text-xs text-amber-400 mt-1 flex items-center gap-1 bg-amber-400/10 px-3 py-2 rounded-lg">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      No playlists available. Create one in the sidebar!
                    </p>
                  )}
                </div>

                {/* File Uploads Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Thumbnail Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-indigo-400" />
                      Cover Image
                    </label>
                    <div
                      className={`relative group transition-all duration-200 ${dragActive.image ? 'scale-102' : ''
                        }`}
                      onDragOver={(e) => handleDrag(e, 'image', true)}
                      onDragLeave={(e) => handleDrag(e, 'image', false)}
                      onDrop={(e) => handleDrop(e, 'image')}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="thumbnail-upload"
                        onChange={(e) => handleFileChange(e, 'image')}
                      />
                      <label
                        htmlFor="thumbnail-upload"
                        className={`flex flex-col items-center justify-center w-full h-40 
                                 bg-slate-800/50 border-2 border-dashed rounded-xl cursor-pointer
                                 transition-all duration-200 group overflow-hidden
                                 ${dragActive.image
                            ? 'border-indigo-400 bg-indigo-600/10 scale-105'
                            : imagePreview
                              ? 'border-indigo-500/50 hover:border-indigo-400'
                              : 'border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-600/10'
                          }`}
                      >
                        {imagePreview ? (
                          <div className="relative w-full h-full">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-sm">Click to change</span>
                            </div>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className={`w-8 h-8 transition-colors ${dragActive.image ? 'text-indigo-400' : 'text-indigo-400/60 group-hover:text-indigo-400'
                              }`} />
                            <span className={`mt-2 text-sm transition-colors ${dragActive.image ? 'text-indigo-300' : 'text-indigo-300/60 group-hover:text-indigo-300'
                              }`}>
                              {dragActive.image ? 'Drop image here' : 'Click or drag cover'}
                            </span>
                            <span className="text-xs text-indigo-400/40 mt-1">
                              PNG, JPG up to 5MB
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Audio Upload */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-indigo-200 flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-indigo-400" />
                      Audio File
                    </label>
                    <div
                      className={`relative group transition-all duration-200 ${dragActive.audio ? 'scale-102' : ''
                        }`}
                      onDragOver={(e) => handleDrag(e, 'audio', true)}
                      onDragLeave={(e) => handleDrag(e, 'audio', false)}
                      onDrop={(e) => handleDrop(e, 'audio')}
                    >
                      <input
                        type="file"
                        accept="audio/*"
                        className="hidden"
                        id="audio-upload"
                        onChange={(e) => handleFileChange(e, 'audio')}
                      />
                      <label
                        htmlFor="audio-upload"
                        className={`flex flex-col items-center justify-center w-full h-40 
                                 bg-slate-800/50 border-2 border-dashed rounded-xl cursor-pointer
                                 transition-all duration-200 group
                                 ${dragActive.audio
                            ? 'border-indigo-400 bg-indigo-600/10 scale-105'
                            : audioPreview
                              ? 'border-indigo-500/50 hover:border-indigo-400'
                              : 'border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-600/10'
                          }`}
                      >
                        {audioPreview ? (
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-2">
                              <Play className="w-5 h-5 text-white ml-0.5" />
                            </div>
                            <span className="text-sm text-indigo-200">Audio file ready</span>
                            <span className="text-xs text-indigo-400/60 block mt-1">
                              {audio?.name?.substring(0, 20)}...
                            </span>
                          </div>
                        ) : (
                          <>
                            <Headphones className={`w-8 h-8 transition-colors ${dragActive.audio ? 'text-indigo-400' : 'text-indigo-400/60 group-hover:text-indigo-400'
                              }`} />
                            <span className={`mt-2 text-sm transition-colors ${dragActive.audio ? 'text-indigo-300' : 'text-indigo-300/60 group-hover:text-indigo-300'
                              }`}>
                              {dragActive.audio ? 'Drop audio here' : 'Click or drag audio'}
                            </span>
                            <span className="text-xs text-indigo-400/40 mt-1">
                              MP3, WAV up to 10MB
                            </span>
                          </>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white cursor-pointer
                           transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]
                           flex items-center justify-center gap-2 relative overflow-hidden group
                           ${loading
                      ? 'bg-indigo-400/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-xl hover:shadow-indigo-600/30'
                    }`}
                >
                  {/* Animated gradient overlay */}
                  <div
                    disabled={loading}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Upload Music
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Playlists */}
          <div className="lg:w-80 space-y-6">
            {/* Add Playlist Component */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Create Playlist
                </h3>
              </div>
              <div className="p-6">
                <AddPlaylist />
              </div>
            </div>

            {/* Playlists List */}
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-indigo-500/20">
              <div className="bg-gradient-to-r from-indigo-800 to-purple-800 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <ListMusic className="w-5 h-5" />
                  Your Playlists
                </h3>
              </div>

              <div className="p-6 max-h-[50vh] overflow-auto scrollbar-thin scrollbar-thumb-indigo-600/20 scrollbar-track-transparent">
                {playListName.length > 0 ? (
                  <div className="space-y-2">
                    {playListName.map((item, index) => (
                      <div
                        key={item._id}
                        className="group flex items-center justify-between p-3 
                                 bg-slate-800/30 hover:bg-indigo-600/20 rounded-xl
                                 border border-indigo-500/10 hover:border-indigo-400/30
                                 transition-all duration-200 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 
                                      rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/30">
                            <Album className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-indigo-200 group-hover:text-indigo-400">
                            {item.playListName}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-indigo-400/60 group-hover:text-indigo-400 
                                               group-hover:translate-x-1 transition-all" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-indigo-600/20 rounded-full flex items-center justify-center mb-3">
                      <ListMusic className="w-8 h-8 text-indigo-400/60" />
                    </div>
                    <p className="text-indigo-200">No playlists yet</p>
                    <p className="text-sm text-indigo-400/60 mt-1">
                      Create your first playlist
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <div>
                <Add_Artist />
          </div>
        </div>

      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#1e1b4b',
            color: '#fff',
            borderRadius: '12px',
            border: '1px solid rgba(129, 140, 248, 0.2)',
          },
          success: {
            duration: 3000,
            icon: '🎵',
          },
        }}
      />

      <style>{`
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
        .scale-102 {
          transform: scale(1.02);
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(129, 140, 248, 0.2);
          border-radius: 20px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(129, 140, 248, 0.4);
        }
      `}</style>
    </div>
  );
}