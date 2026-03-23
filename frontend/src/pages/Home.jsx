import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PlayBar from "../components/PlayBar";
import { useState } from "react";

const HomePage = ({}) => {
  const navigate = useNavigate();

  const handlePlayList = async (playlist) => {
    const playlistName = playlist.replace(" ","-").toLowerCase()
    navigate(`/${playlistName}`)
  }

  useEffect(()=>{

  },[])
  

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen text-white font-sans ">
      {/* Hero Section */}
      <section className="relative flex flex-col z-0 items-center justify-center h-[70vh] bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="text-center z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Feel the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Beats</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-200/80 mb-8 max-w-2xl mx-auto px-4">
            Your personal music world — explore trending hits & playlists in stunning violet vibes
          </p>
          <button 
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 px-8 py-4 rounded-full font-semibold cursor-pointer shadow-lg shadow-indigo-600/30 hover:shadow-purple-600/40 transform hover:scale-105"
            onClick={()=>navigate("/start-listening")}
          >
            Start Listening
          </button>
        </div>

        {/* Decorative music notes */}
        <div className="absolute bottom-10 left-10 text-indigo-400/20 text-4xl hidden md:block">♪</div>
        <div className="absolute top-20 right-20 text-purple-400/20 text-6xl hidden md:block">♫</div>
        <div className="absolute bottom-20 right-40 text-pink-400/20 text-5xl hidden md:block">♩</div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
      </section>

      {/* Featured Playlists Section */}
      <section className="py-16 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Playlists
            </h2>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span className="w-2 h-2 rounded-full bg-purple-500"></span>
              <span className="w-2 h-2 rounded-full bg-pink-500"></span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Sad Songs", icon: "🌧️", gradient: "from-indigo-600 to-purple-600" },
              { name: "Masti Hits", icon: "🎉", gradient: "from-purple-600 to-pink-600" },
              { name: "Old Classics", icon: "🎺", gradient: "from-violet-600 to-indigo-600" },
              { name: "Energetic Feel", icon: "⚡", gradient: "from-pink-600 to-purple-600" },
            ].map((playlist, index) => (
              <div
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-indigo-600/20 transition-all duration-300 cursor-pointer border border-indigo-500/20 hover:border-indigo-400/40"
                onClick={()=>handlePlayList(playlist.name)}
              >
                <div className={`h-32 bg-gradient-to-br ${playlist.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <span className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300">{playlist.icon}</span>
                  <span className="absolute -bottom-6 -right-6 w-16 h-16 bg-white/10 rounded-full blur-xl"></span>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{playlist.name}</h3>
                  <p className="text-indigo-300/60 text-sm flex items-center gap-1">
                    <span>Tap to explore</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 md:px-12 border-y border-indigo-500/20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "10M+", label: "Songs", icon: "🎵" },
            { number: "5K+", label: "Artists", icon: "🎤" },
            { number: "1M+", label: "Listeners", icon: "👥" },
            { number: "100+", label: "Playlists", icon: "📑" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-indigo-300/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-6 mb-4">
            <span className="text-indigo-400/60 hover:text-indigo-400 cursor-pointer transition-colors">About</span>
            <span className="text-indigo-400/60 hover:text-indigo-400 cursor-pointer transition-colors">Contact</span>
            <span className="text-indigo-400/60 hover:text-indigo-400 cursor-pointer transition-colors">Terms</span>
            <span className="text-indigo-400/60 hover:text-indigo-400 cursor-pointer transition-colors">Privacy</span>
          </div>
          <p className="text-indigo-300/40 text-sm">
            © {new Date().getFullYear()} Music Player. Made with💜by Tanay Patel.
          </p>
        </div>
      </footer>

      {/* Add animation styles */}
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;