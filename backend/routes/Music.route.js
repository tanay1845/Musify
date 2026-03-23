import express from "express"
import { fetchCurrentSong, fetchMusic, fetchPlaylist, fetchSongFromMyPlayList, storeMusic } from "../controllers/Music.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { upload } from "../middleware/multer.middleware.js"
import { removeSongFromPlaylist } from "../controllers/Playlist.controller.js"

const router = express.Router()


router.post("/store",authMiddleware,upload.fields([
    { name: "audio", maxCount:1},
    { name: "thumbnail", maxCount:1}

]),storeMusic)


router.get("/fetch",fetchMusic)

router.post("/current-song",fetchCurrentSong)

router.post("/fetch-playlist",fetchPlaylist)

router.post("/get-song-myplaylist",authMiddleware,fetchSongFromMyPlayList)

router.post("/remove-song",authMiddleware,removeSongFromPlaylist)



export default router