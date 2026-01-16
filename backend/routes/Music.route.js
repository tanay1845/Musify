import express from "express"
import { storeMusic } from "../controllers/Music.controller.js"
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router()


router.post("/store",storeMusic)



export default router