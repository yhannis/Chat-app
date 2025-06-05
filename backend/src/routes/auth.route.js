
import express from "express";
import { signup, login, logout, checkAuth, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoute ,updateProfile) //call protectRoute first to verify if user is logged in or not
router.get("/check", protectRoute, checkAuth)

export default router;