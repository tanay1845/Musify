import axios from "axios";
import { ImageIcon, Loader2, User } from "lucide-react";
import React, { useState, useRef } from "react";

function Add_Artist() {
  const [artistName, setArtistName] = useState("");
  const [artistImage, setArtistImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState({ image: false });
  const [loading, setLoading] = useState(false)

  const fileInputRef = useRef(null);

  // 🎯 Drag handlers
  const handleDrag = (e, type, status) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [type]: status }));
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];

    if (file) {
      setArtistImage(file);
      setImagePreview(URL.createObjectURL(file));
    }

    setDragActive((prev) => ({ ...prev, [type]: false }));
  };

  // 🎯 Submit handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!artistName) {
      alert("Artist name is required");
      return;
    }

    if (!artistImage) {
      alert("Please upload artist image");
      return;
    }

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("artistName", artistName);
      formData.append("artistImage", artistImage);

      const res = await axios.post(
        "http://localhost:3000/api/v1/artist/add-artist",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("SUCCESS:", res.data);

      // reset form
      setArtistName("");
      setArtistImage(null);
      setImagePreview(null);
      setLoading(false)
    } catch (error) {
      console.error("ERROR:", error.response?.data);
      setLoading(false)
    }
  };

  return (
    <div className="max-w-full mt-8">
      <div className="bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 rounded-2xl border border-blue-950">

        {/* Header */}
        <h2 className="bg-gradient-to-r from-blue-500 via-violet-800 to-pink-600 p-5 rounded-t-2xl text-white">
          <p className="font-semibold text-2xl">Add New Artist</p>
          <p className="text-sm">Fill the details and add new Artist</p>
        </h2>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="p-5 flex flex-col">

          {/* Artist Name */}
          <div className="space-y-2">
            <label className="text-sm text-indigo-200 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              Artist Name
            </label>

            <input
              type="text"
              placeholder="e.g., The Weeknd"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-indigo-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2 mt-5">
            <label className="text-sm text-indigo-200 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-indigo-400" />
              Cover Image
            </label>

            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => handleDrag(e, "image", true)}
              onDragLeave={(e) => handleDrag(e, "image", false)}
              onDrop={(e) => handleDrop(e, "image")}
              className={`relative cursor-pointer rounded-xl border-2 border-dashed flex items-center justify-center h-40 transition-all
                ${dragActive.image
                  ? "border-indigo-400 bg-indigo-500/10 scale-105"
                  : "border-indigo-500/30 hover:border-indigo-400"
                }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setArtistImage(file);
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
              />

              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <ImageIcon className="w-8 h-8 text-indigo-400/70" />
                  <p className="text-sm text-indigo-300 mt-2">
                    Click or Drag Image
                  </p>
                  <p className="text-xs text-indigo-400/40">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
                  type="submit"
                  disabled={loading}
                  className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold text-white cursor-pointer
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
                      Adding...
                    </>
                  ) : (
                    <>
                      Add Artist
                    </>
                  )}
                </button>

        </form>
      </div>
    </div>
  );
}

export default Add_Artist;