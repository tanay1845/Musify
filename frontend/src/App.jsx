import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import MusicView from './components/MusicPage';
import PlayBar from './components/PlayBar';
import Masti from './components/playlist/Masti';
import "./App.css";
import HomePage from "./components/Home";
import UploadMusic from "./components/UploadMusic";

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
      </Routes>

      <PlayBar />
    </>
  );
}

export default App;
