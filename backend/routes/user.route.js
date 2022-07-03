import express from "express";
import {
  login,
  register,
  getAllUsers,
  updateInfo,
} from "../controllers/user.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/all", verifyToken, checkRole("admin"), getAllUsers);
router.put("/update/info/:id", verifyToken, updateInfo);
router.get("/auth", verifyToken, checkRole("admin"), (req, res) => {
  res.status(200).json("nice");
});
export default router;
