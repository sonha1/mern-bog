import express from "express";
import {
  login,
  register,
  getAllUsers,
  updateInfo,
} from "../controllers/user.controller.js";
import { body } from "express-validator";
import { validate } from "../handlers/validation.js";

import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/login", body("email").isEmail(), validate, login);
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  validate,
  register
);
router.get("/all", verifyToken, checkRole("admin"), getAllUsers);
router.put("/update/info/:id", verifyToken, updateInfo);
router.get("/auth", verifyToken, checkRole("admin"), (req, res) => {
  res.status(200).json("nice");
});
export default router;
