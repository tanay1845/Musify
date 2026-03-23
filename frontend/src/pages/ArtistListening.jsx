// pages/Artists.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Mic2, Search, TrendingUp, Users } from "lucide-react";
import ArtistCard from "../components/Artist";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetchArtists();
  }, []);

  useEffect(() => {
    filterArtists();
  }, [searchTerm, category, artists]);

  const fetchArtists = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:3000/api/v2/artist/all",
        { withCredentials: true }
      );
      setArtists(res.data.artists);
      setFilteredArtists(res.data.artists);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const filterArtists = () => {
    let filtered = [...artists];
    
    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(artist =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (category === "popular") {
      filtered = filtered.sort((a, b) => (b.followers || 0) - (a.followers || 0));
    } else if (category === "new") {
      filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    setFilteredArtists(filtered);
  };

  const handleArtistClick = (artist) => {
    navigate(`/artist/${artist._id}/${artist.name.toLowerCase().replace(/ /g, "-")}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950 flex items-center justify-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Mic2 size={24} className="text-indigo-400 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Mic2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                           bg-clip-text text-transparent">
                Artists
              </h1>
              <p className="text-indigo-300/60 mt-1">
                {filteredArtists.length} artists • Discover new music
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" size={20} />
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-indigo-500/30 rounded-full py-3 pl-12 pr-4 
                       text-white placeholder-indigo-300/50 focus:outline-none focus:border-indigo-400 
                       focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          
          <div className="flex gap-2">
            {["all", "popular", "new"].map((opt) => (
              <button
                key={opt}
                onClick={() => setCategory(opt)}
                className={`px-4 py-2 rounded-full capitalize transition-all ${
                  category === opt
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-slate-800/50 text-indigo-300/60 hover:text-indigo-300'
                }`}
              >
                {opt === "all" ? "All" : opt === "popular" ? "Popular" : "New"}
              </button>
            ))}
          </div>
        </div>

        {/* Artists Grid */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-indigo-500/20">
            <Mic2 size={48} className="mx-auto text-indigo-400/30 mb-3" />
            <p className="text-indigo-300/60">No artists found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtists.map((artist, index) => (
              <ArtistCard
                key={artist._id}
                artist={artist}
                onClick={() => handleArtistClick(artist)}
              />
            ))}
          </div>
        )}

        <div className="h-24"></div>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default Artists;