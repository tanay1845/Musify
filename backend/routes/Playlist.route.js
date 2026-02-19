import express from "express"
import { addSongToPlayList, createMyPlayList, fetchPlayList, getMyPlayList, makeNewPlaylist, removePlayList } from "../controllers/Playlist.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/new-playlist",upload.single("playlistThumbnail"),makeNewPlaylist)

router.get("/get-playlists",fetchPlayList)

router.post("/my-playlist/create",authMiddleware,createMyPlayList)

router.post("/add-song",authMiddleware,addSongToPlayList)

router.get("/get-my-playlist",authMiddleware,getMyPlayList)

router.post("/remove-playlist",authMiddleware,removePlayList)

export default router;