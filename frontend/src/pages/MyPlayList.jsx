import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, 
  Music, 
  Trash2, 
  Play, 
  ListMusic,
  Loader,
  MoreVertical,
  Edit3
} from "lucide-react";

function MyPlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);

  const navigate = useNavigate();

  const fetchMyPlaylists = async () => {
    try {
      setFetchLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v1/playlist/get-my-playlist",
        { withCredentials: true }
      );
      setPlaylists(res.data.myPlayList);
      setFetchLoading(false);
    } catch (error) {
      console.log(error);
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPlaylists();
  }, []);

  // Create Playlist
  const createPlaylistHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/v1/playlist/my-playlist/create",
        { myPlayListName: newPlaylistName },
        { withCredentials: true }
      );
      console.log(res.data);
      setNewPlaylistName("");
      fetchMyPlaylists();
      setShowCreateForm(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Delete Playlist
  const deletePlaylist = async (id, e) => {
    e.stopPropagation();
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/my-playlist/${id}`,
        { withCredentials: true }
      );
      fetchMyPlaylists();
    } catch (error) {
      console.log(error);
    }
  };

  // Toggle menu
  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setMenuOpen(menuOpen === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Playlists
            </h1>
            <p className="text-indigo-300/60 mt-1">
              {playlists.length} {playlists.length === 1 ? 'playlist' : 'playlists'} created
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40 transform hover:scale-105 self-start"
          >
            <Plus size={20} />
            Create New Playlist
          </button>
        </div>

        {/* Create Playlist Form */}
        {showCreateForm && (
          <div className="mb-10 bg-slate-900/50 backdrop-blur-xl border border-indigo-500/20 rounded-2xl p-6 animate-slideDown">
            <h2 className="text-xl font-semibold text-indigo-200 mb-4 flex items-center gap-2">
              <Plus size={20} className="text-indigo-400" />
              Create New Playlist
            </h2>
            <form onSubmit={createPlaylistHandler} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter playlist name..."
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-slate-800/50 border border-indigo-500/30
                         focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20
                         text-white placeholder-indigo-300/50 transition-all"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                           hover:from-indigo-500 hover:to-purple-500 rounded-xl font-semibold 
                           transition-all disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={18} />
                      Create
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-indigo-500/30 
                           rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Loading State */}
        {fetchLoading && (
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
        {!fetchLoading && playlists.length === 0 && (
          <div className="text-center py-20 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-indigo-500/20">
            <div className="w-24 h-24 mx-auto bg-indigo-600/20 rounded-full flex items-center justify-center mb-4">
              <ListMusic size={40} className="text-indigo-400/60" />
            </div>
            <h3 className="text-xl font-semibold text-indigo-200 mb-2">No playlists yet</h3>
            <p className="text-indigo-300/60 mb-6">Create your first playlist to get started</p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 
                       hover:from-indigo-500 hover:to-purple-500 rounded-full font-semibold transition-all"
            >
              <Plus size={20} />
              Create Playlist
            </button>
          </div>
        )}

        {/* Playlist Grid */}
        {!fetchLoading && playlists.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((item) => (
              <div
                key={item._id}
                className="group relative bg-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl 
                         overflow-hidden transition-all duration-300 cursor-pointer
                         border border-indigo-500/20 hover:border-indigo-400/40
                         hover:shadow-2xl hover:shadow-indigo-600/20
                         transform hover:-translate-y-1"
                onClick={() => navigate(`/${item.myPlayListName.toLowerCase().replace(/ /g, "-")}/${item._id}`)}
              >
                {/* Thumbnail with Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={"https://res.cloudinary.com/dfxswq5lf/image/upload/v1770709780/Music_Red_App_Icon_uwrna7.jpg"}
                    alt={item.myPlayListName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full 
                                  flex items-center justify-center transform scale-90 group-hover:scale-100 
                                  transition-transform shadow-lg shadow-indigo-600/50">
                      <Play size={24} className="text-white ml-1" />
                    </div>
                  </div>

                  {/* Song Count Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full 
                                text-xs text-indigo-300 border border-indigo-500/30">
                    {item.songs?.length || 0} songs
                  </div>

                  {/* Menu Button */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => toggleMenu(e, item._id)}
                      className="p-2 bg-black/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 
                               transition-opacity hover:bg-indigo-600/80"
                    >
                      <MoreVertical size={16} className="text-white" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {menuOpen === item._id && (
                      <div className="absolute top-12 right-0 bg-slate-800/95 backdrop-blur-xl 
                                    border border-indigo-500/20 rounded-lg shadow-xl z-10 w-36">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Edit functionality
                            setMenuOpen(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-indigo-200 
                                   hover:bg-indigo-600/20 transition-colors rounded-t-lg"
                        >
                          <Edit3 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            deletePlaylist(item._id, e);
                            setMenuOpen(null);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-400 
                                   hover:bg-red-600/20 transition-colors rounded-b-lg"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-indigo-400 transition-colors">
                        {item.myPlayListName}
                      </h2>
                      <p className="text-indigo-300/40 text-xs">
                        Created {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    {/* Playlist Icon */}
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 
                                  rounded-lg flex items-center justify-center border border-indigo-500/30">
                      <ListMusic size={16} className="text-indigo-400" />
                    </div>
                  </div>

                  {/* Last played or additional info */}
                  {item.lastPlayed && (
                    <p className="text-xs text-indigo-300/40 mt-2">
                      Last played: {new Date(item.lastPlayed).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
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

export default MyPlaylist;