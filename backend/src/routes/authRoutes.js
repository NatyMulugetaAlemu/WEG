import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authControllers.js"
import { protectRoute } from "../middleware/protectRoute.js"

const router=express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)
router.post("/upadeteProfile",protectRoute,updateProfile)
router.get("/checkAuth",protectRoute,checkAuth)

export default router