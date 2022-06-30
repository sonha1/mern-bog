import express from "express";
import { login, register } from "../controllers/user.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/auth", verifyToken, checkRole("user"), (req, res) => {
  res.status(200).json("nice");
});
export default router;
