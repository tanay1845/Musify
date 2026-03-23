import React, { useEffect, useState } from "react";
import { Search, User, Menu } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [admin, setAdmin] = useState(false);

  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/user/current-user",
      { withCredentials: true }
    );
    setUser(res.data.user);
    setAdmin(res.data.user.isAdmin)
  };



  useEffect(() => {
    fetchCurrentUser();
  }, [setAdmin,setUser]);

  return (
    <nav className="w-full sticky top-0 z-50 bg-gradient-to-r from-[#5a1a1a] via-[#6e2b2b] to-[#4b2a1a]">
      {/* REMOVE max-w ON MOBILE */}
      <div className="w-full md:max-w-7xl md:mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src="/logo2.png" alt="musify" className="w-12" />
          <h1 className="text-white text-xl font-bold">
            Musi<span className="text-[#ffb347]">Fy</span>
          </h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-6 text-white">
          <li onClick={() => navigate("/")} className="hover:text-[#ffb347] cursor-pointer">Home</li>
          {
           (admin=="true") ? (<li onClick={() => navigate("/upload-music-files")} className="hover:text-[#ffb347] cursor-pointer">Upload</li>):("")
          }
          <li onClick={() => navigate("/playlist")} className="hover:text-[#ffb347] cursor-pointer">Playlists</li>
          <li onClick={() => navigate("/my-playlist")} className="hover:text-[#ffb347] cursor-pointer">My Playlist</li>
        </ul>

        {/* Right */}
        <div className="flex items-center gap-4">

          {/* Mobile menu */}
          <Menu
            className="text-white md:hidden cursor-pointer"
            size={26}
            onClick={() => setShow(!show)}
          />

          <User
            className="text-white cursor-pointer hover:text-[#ffb347]"
            size={24}
            onClick={() => navigate("/user-profile")}
          />
        </div>
      </div> 

      {/* Mobile Dropdown */}
      {show && (
        <div className="md:hidden bg-slate-800 text-white px-4 py-3 flex flex-col gap-3 items-center shadow-2xl">
          <div onClick={() => navigate("/")} className="cursor-pointer">Home</div>
          <div onClick={() => navigate("/upload-music-files")} className="cursor-pointer">Upload</div>
          <div onClick={() => navigate("/playlist")} className="cursor-pointer">Playlists</div>
          <div className="cursor-pointer">Trending</div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
