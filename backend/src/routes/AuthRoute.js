import express from "express";
import multer from "multer";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/AuthController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"),
  updateProfile
);
router.get("/check", protectRoute, checkAuth);

export default router;
