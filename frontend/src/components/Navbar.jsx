import React, { useEffect } from "react";
import { Music, Search, User } from "lucide-react"; // for icons
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {

  const [user, setUser] = useState("")

  const navigate = useNavigate();

  const fetchCurrentUser = async() => {
    const res = await axios.get("https://musify-liard-rho.vercel.app/api/v1/user/current-user",{withCredentials:true})
    // console.log(res.data.user)
    setUser(res.data.user)
  }

  useEffect(() => {
    fetchCurrentUser()
  },[])
  return (
    <nav className="w-full sticky top-0 z-10 bg-gradient-to-r from-[#5a1a1a] via-[#6e2b2b] to-[#4b2a1a] shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2 cursor-pointer">
          {/* <Music className="text-white" size={26} /> */}
          <img src="./public/logo2.png" alt="musify" 
          className="w-14"/>
          <h1 className="text-white text-xl font-bold tracking-wide">
            Musi<span className="text-[#ffb347]">Fy</span>
          </h1>
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center gap-6">
          <li className="text-white hover:text-[#ffb347] transition cursor-pointer"
          onClick={()=>navigate("/")}
          >Home</li>
          <li className="text-white hover:text-[#ffb347] transition cursor-pointer"
            onClick={()=>navigate("/upload-music-files")}
          >Upload</li>
          <li className="text-white hover:text-[#ffb347] transition cursor-pointer">Playlists</li>
          <li className="text-white hover:text-[#ffb347] transition cursor-pointer">Trending</li>
        </ul>

        {/* Right Section */}

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search songs..."
              className="bg-[#2a2a2a] text-white rounded-full pl-10 pr-4 py-1 focus:outline-none focus:ring-2 focus:ring-[#ffb347] text-sm"
              />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
          </div>
          <User className="text-white cursor-pointer hover:text-[#ffb347]" 
          size={24}
          onClick={()=>navigate("/user-profile")} />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
