import express from "express"
import { fetchMusic, fetchPlaylist, storeMusic } from "../controllers/Music.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { upload } from "../middleware/multer.middleware.js"

const router = express.Router()


router.post("/store",authMiddleware,upload.fields([
    { name: "audio", maxCount:1},
    { name: "thumbnail", maxCount:1}

]),storeMusic)


router.get("/fetch",fetchMusic)

router.post("/fetch-playlist",fetchPlaylist)


export default router