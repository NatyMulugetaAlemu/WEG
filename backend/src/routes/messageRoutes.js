import { getMessages, getUsers4SideBar } from "../controllers/messageControllers"
import express from express
import { protectRoute } from "../middleware/protectRoute"

const router=express.Router()

router.get("/users",protectRoute,getUsers4SideBar)
router.get("/messages/:id",protectRoute,getMessages)

export default router