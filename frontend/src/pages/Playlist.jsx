import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Playlist() {
  const [playlist, setPlaylist] = useState([]);

  const navigate = useNavigate()

  const fetchPlaylist = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/playlist/get-playlists",
      { withCredentials: true }
    );
    setPlaylist(res.data.playlist);
  };


  useEffect(() => {
    fetchPlaylist();
  }, []);

  return (
    <div className="min-h-screen bg-black px-6 py-8">
      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600 ">
          Your Playlists
        </h1>
        <div className="cursor-pointer">
          <img src="plus.png" alt="add"
            className="w-6 h-6 invert-100"
            onClick={() => navigate("/playlist/add-playlist")}
          />
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {playlist.map((item) => (
          <div
            key={item._id}
            className="bg-[#111] rounded-xl shadow-lg overflow-hidden
                       hover:scale-105 transition-transform duration-300 cursor-pointer
                       border border-[#222] hover:border-red-600"
            onClick={() => navigate(`/${item.playListName.toLowerCase().replace(" ", "-")}`)}
          >
            {/* Thumbnail */}
            <div className="h-44 overflow-hidden">
              <img
                src={`${item.playlistThumbnail}`}
                alt="playlist"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 flex justify-between px-4">
              <h2 className="text-white font-semibold text-lg truncate">
                {item.playListName}
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

export default Playlist;
