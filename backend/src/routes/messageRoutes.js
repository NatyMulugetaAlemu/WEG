import { getMessages, getUsers4Sidebar, sendMessage } from "../controllers/messageControllers.js"
import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"

const router=express.Router()

router.get("/users",protectRoute,getUsers4Sidebar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)


export default router