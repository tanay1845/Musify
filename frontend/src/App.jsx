import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UploadMusic from "./pages/UploadMusic";
import MusicView from "./pages/MusicPage";
import Masti from './components/playlist/Masti';
import PlayBar from "./components/PlayBar";
import Playlist from "./pages/Playlist";
import AddPlaylist from "./components/AddPlaylist"
import MyPlayList from "./pages/MyPlayList";
import MusicFullScreen from "./components/MusicFullScreen";
import MyPlayListSong from "./pages/MyPlayListSong";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user-profile" element={<Profile />} />
        <Route path="/upload-music-files" element={<UploadMusic />} />
        <Route path="/start-listening" element={<MusicView />} />
        <Route path="/:playlistName" element={<Masti />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/my-playlist" element={<MyPlayList />} />
        <Route path="/music/:id" element={<MusicFullScreen />} />
        <Route path="/:myplaylist/:id" element={<MyPlayListSong />} />

      </Routes>

      <PlayBar />
    </>
  );
}

export default App;
