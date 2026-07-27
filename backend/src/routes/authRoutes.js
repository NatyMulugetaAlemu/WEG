import express from "express"
import { login, logout, signup, updateProfile } from "../controllers/authControllers.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.put("/updateProfile",protectRoute,updateProfile)

export default router