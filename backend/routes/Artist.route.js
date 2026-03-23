import express from "express"
import { addArtist } from "../controllers/Artist.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router()

router.post("/add-artist",authMiddleware,upload.single("artistImage"),addArtist)

export default router;