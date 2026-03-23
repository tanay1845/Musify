// components/ArtistCard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Music2, Mic2, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ artist, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="group cursor-pointer bg-slate-900/50 backdrop-blur-sm rounded-xl 
                 overflow-hidden border border-indigo-500/20 hover:border-indigo-400/40
                 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-600/20"
    >
      {/* Artist Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={artist.image || "https://via.placeholder.com/400x400/1e1b4b/818cf8?text=Artist"}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full 
                        flex items-center justify-center transform scale-90 group-hover:scale-100 
                        transition-transform shadow-lg shadow-indigo-600/50">
            <Music2 size={24} className="text-white ml-0.5" />
          </div>
        </div>

        {/* Artist Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-indigo-300 border border-indigo-500/30">
            Artist
          </span>
        </div>
      </div>

      {/* Artist Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-indigo-400 transition-colors">
          {artist.name}
        </h3>
        
        <div className="flex items-center gap-3 text-xs text-indigo-300/60">
          <span className="flex items-center gap-1">
            <Mic2 size={12} className="text-indigo-400" />
            {artist.songCount || 0} Songs
          </span>
          <span className="flex items-center gap-1">
            <Users size={12} className="text-indigo-400" />
            {artist.followers || "1.2k"} Followers
          </span>
        </div>

        {/* Genre Tags */}
        {artist.genres && artist.genres.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {artist.genres.slice(0, 2).map((genre, idx) => (
              <span key={idx} className="text-xs px-2 py-0.5 bg-indigo-600/20 rounded-full text-indigo-300">
                {genre}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ArtistCard;