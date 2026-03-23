import express from "express"
import { addLikeToSong, fetchCurrentUser, fetchLikedSong, loginUser, logoutUser, signupUser } from "../controllers/User.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",signupUser);

router.post("/login",loginUser);

router.get("/current-user",authMiddleware,fetchCurrentUser);

router.get("/logout",authMiddleware,logoutUser)

router.post("/add-like",authMiddleware,addLikeToSong)

router.get("/fetch-like",authMiddleware,fetchLikedSong)

export default router;