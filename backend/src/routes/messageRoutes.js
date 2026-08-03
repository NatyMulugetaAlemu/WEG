import { getMessages, getUsers4SideBar, sendMessage } from "../controllers/messageControllers.js"
import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"

const router=express.Router()

router.get("/users",protectRoute,getUsers4SideBar)
router.get("/:id",protectRoute,getMessages)
router.get("/send/:id",protectRoute,sendMessage)


export default router