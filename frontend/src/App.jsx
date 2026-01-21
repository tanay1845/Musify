import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import UploadMusic from './components/UploadMusic';
import MusicView from './components/MusicPage';
import PlayBar from './components/PlayBar';
import Masti from './components/playlist/Masti';
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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
