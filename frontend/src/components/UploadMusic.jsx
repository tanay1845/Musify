import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function UploadMusic() {
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [playList, setPlayList] = useState("");
  const [audio, setAudio] = useState(null);
  const [thumbnail, setThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("artistName", artistName);
      formData.append("playList", playList);
      formData.append("thumbnail", thumbnail);
      formData.append("audio", audio);

      setLoading(true)
      const res = await axios.post(
        "http://localhost:3000/api/v2/music/store",
        formData,
        {
          withCredentials: true,
        },

      );

      toast.success("Music uploaded successfully 🎵");

      setTitle("");
      setArtistName("");
      setPlayList("");
      setThumbnail(null);
      setAudio(null);
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message || "Music not uploaded")
      setLoading(false)
    }
  };


  return (
    <div className="min-h-screen flex items-start justify-center pt-10">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-[#982b1f] mb-6">
          Upload Music
        </h2>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Song title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#982b1f]"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>



          {/* Artist */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Artist Name
            </label>
            <input
              type="text"
              placeholder="Artist name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#982b1f]"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
            />
          </div>

          {/* Playlist */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Playlist
            </label>
            <input
              type="text"
              placeholder="Playlist name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#982b1f]"
              value={playList}
              onChange={(e) => setPlayList(e.target.value)}
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Thumbnail
            </label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-[#982b1f]"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>


          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Audio
            </label>
            <input
              type="file"
              className="w-full px-3 py-2 border cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-[#982b1f]"
              onChange={(e) => setAudio(e.target.files[0])}
            />
          </div>


          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-2 rounded-lg transition duration-200
    ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#982b1f] hover:bg-[#7a2118] cursor-pointer"
              } text-white`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Uploading...
              </>

            ) : (
              "Upload Music"
            )}
          </button>

        </form>

        <Toaster position="bottom-right" />
      </div>
    </div>
  );
}
