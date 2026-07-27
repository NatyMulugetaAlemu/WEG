import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authControllers.js"
import { protectRoute } from "../middleware/protectRoute.js"
import { getMessages, getUsers4Sidebar } from "../controllers/messageControllers.js"

const router=express.Router()

router.get("/users",protectRoute,getUsers4Sidebar)
router.post("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)


export default router