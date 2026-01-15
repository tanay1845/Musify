import React, { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const HomePage = () => {

  const navigate = useNavigate();

  // const fetchUser = async() => {
  //   try {
  //     const user = await axios.get("http://loxalhost:3000/api/v1/user/current-user",{withCredentials:true})
  //     if(!user){
  //       navigate("/login");
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchUser();
  // }, [])

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[70vh] bg-gradient-to-b from-[#4a1f1f] to-[#2c1a14]">
        <div className="text-center z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Feel the <span className="text-[#ff4b4b]">Beats</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            Your personal music world — explore trending hits & playlists
          </p>
          <button className="bg-[#8b0000] hover:bg-[#a52a2a] transition px-6 py-3 rounded-full font-semibold">
            Start Listening
          </button>
        </div>

        <div className="absolute inset-0 bg-black opacity-30"></div>
      </section>

      {/* Featured Playlists Section */}
      <section className="py-12 px-6 md:px-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#ff4b4b]">
          🎧 Featured Playlists
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Chill Vibes",
            "Top Hits",
            "Workout Mix",
            "Old Classics",
            "Jazz Nights",
            "EDM Party",
            "Romantic Tracks",
            "Lo-Fi Beats",
          ].map((playlist, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <div className="h-32 bg-gradient-to-br from-[#8b0000] to-[#4a1f1f] flex items-center justify-center">
                <span className="text-xl font-bold">{playlist}</span>
              </div>
              <div className="p-3 text-gray-400 text-sm">
                Tap to explore playlist
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#4a1f1f] py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Music Player. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
