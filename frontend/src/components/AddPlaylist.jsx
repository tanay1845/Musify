import axios from 'axios'
import React from 'react'
import { useState } from 'react'

function AddPlaylist() {

  const [playListName, setPlayListName] = useState("")
  const [playlistThumbnail, setPlaylistThumbnail] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmitHandler = async(e) => {
     e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("playListName",playListName)
      formData.append("playlistThumbnail",playlistThumbnail)

      setLoading(true)

      const res = await axios.post("http://localhost:3000/api/v1/playlist/new-playlist",
        formData
      ,
      {
        withCredentials:true,
      });
        console.log(res)
        setPlayListName("")
        setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <div className='w-full'>
      <div className=''>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              PlayList Name :
            </label>
            <input
              type="text"
              placeholder="Song title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#982b1f]"
              value={playListName}
              onChange={(e) => setPlayListName(e.target.value)}
              required
            />
          </div>



          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-2 rounded-lg transition duration-200
    ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-xl hover:shadow-indigo-600/30"
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
                Creating...
              </>

            ) : (
              "Create"
            )}
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddPlaylist
