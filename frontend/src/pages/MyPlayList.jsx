import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyPlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const fetchMyPlaylists = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/v1/playlist/get-my-playlist",
        { withCredentials: true }
      );
      // console.log(res.data.myPlayList)
      setPlaylists(res.data.myPlayList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyPlaylists();
  }, []);

  // ✅ Create Playlist
  const createPlaylistHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/v1/playlist/my-playlist/create",
        { myPlayListName: newPlaylistName },
        { withCredentials: true }
      );
      console.log(res.data)

      setNewPlaylistName("");
    //   fetchMyPlaylists();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // ✅ Delete Playlist
  const deletePlaylist = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/my-playlist/${id}`,
        { withCredentials: true }
      );
    //   fetchMyPlaylists();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
        My Playlists
      </h1>

      {/* Create Playlist */}
      <form
        onSubmit={createPlaylistHandler}
        className="flex gap-3 justify-center mb-10"
      >
        <input
          type="text"
          placeholder="Enter playlist name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          required
          className="px-4 py-2 rounded-lg bg-[#111] border border-[#333]
                     focus:outline-none focus:border-red-600 w-64"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg
                     font-semibold transition duration-200"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* Playlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {playlists.map((item) => (
          <div
            key={item._id}
            className="bg-[#111] rounded-xl shadow-lg overflow-hidden
                       hover:scale-105 transition-transform duration-300 cursor-pointer
                       border border-[#222] hover:border-red-600"
            onClick={() => navigate(`/${item.myPlayListName.toLowerCase().replace(" ", "-")}/${item._id}`)}
          >
            {/* Thumbnail */}
            <div className="h-44 overflow-hidden">
              <img
                src={"https://res.cloudinary.com/dfxswq5lf/image/upload/v1770709780/Music_Red_App_Icon_uwrna7.jpg"}
                alt="playlist"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex justify-between px-4">
              <h2 className="text-white font-semibold text-lg truncate">
                {item.myPlayListName}
              </h2>

              <div>
                <img src="playlist.png" alt="symbol"
                  className="w-6 h-6 invert-100"
                />
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPlaylist;
