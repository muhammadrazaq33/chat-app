import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

// every user can not update profile first user will validate that the user is login or not
router.put("/update-profile", protectRoute, updateProfile);

// this will check if the user exist or not
router.get("/check", protectRoute, checkAuth);

export default router;
