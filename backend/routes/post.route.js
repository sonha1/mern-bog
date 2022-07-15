import express from "express";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
import {
  createPost,
  getAllPosts,
  deletePost,
  updatePost,
  getPost,
  likePost,
  createComment,
  // testComment
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifyToken, createPost);
router.post("/update/:id", verifyToken, updatePost);
router.post("/like/:id", verifyToken, likePost);
router.get("/all", getAllPosts);
router.post("/comment/create/:id", verifyToken, createComment);
// router.post("/comment/test/:id", verifyToken, testComment);;
router.delete("/delete/:id", verifyToken, deletePost);
router.get("/:id", getPost);

export default router;
