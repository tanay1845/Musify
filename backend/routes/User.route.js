import express from "express"
import { fetchCurrentUser, loginUser, logoutUser, signupUser } from "../controllers/User.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",signupUser);

router.post("/login",loginUser);

router.get("/current-user",authMiddleware,fetchCurrentUser);

router.get("/logout",authMiddleware,logoutUser)

export default router;