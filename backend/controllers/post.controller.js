import {
  create,
  deleteP,
  checkAuthor,
  update,
  get,
  like,
  createCmt,
} from "../services/post.service.js";
import _Post from "../models/post.model.js";
export const createPost = async (req, res, next) => {
  try {
    const { title, content, description, tag } = req.body;
    if (!title || !content || !description || !tag) {
      return res.status(401).json({ message: "please fill full form " });
    }
    const user = req.user._id;
    const post = await create({ title, description, content, tag, user });
    if (!post) {
      return res.status(404).json({ message: "cant create post" });
    }
    return res
      .status(200)
      .json({ message: "create post successfully", data: post });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (req, res) => {
  const posts = await _Post.find({});
  res.status(200).json({ posts });
};

export const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const check = checkAuthor({ postId, userId });

    if (!check) {
      return res.status(403).json({
        message: "you are not author ",
      });
    }
    const post = await deleteP({ postId });

    if (!post) {
      return res.status(404).json({ message: "cant delete post" });
    }
    return res
      .status(200)
      .json({ message: "create post successfully", data: post });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, content, description, tag } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    const check = checkAuthor({ postId, userId });
    if (!check) {
      return res.status(403).json({
        message: "you are not author ",
      });
    }
    const post = await update({
      title,
      description,
      content,
      tag,
      postId,
    });
    return res.status(200).json({ message: "update post successfully" });
  } catch (error) {
    console.log(error);
  }
};
export const getPost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await get({ postId });
    return res.status(200).json({ post });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const data = await like({ userId, postId });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    const { comment } = req.body;
    const userId = req.user._id;
    const postId = req.params.id;

    const data = await createCmt({ postId, userId, comment });
    res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};
