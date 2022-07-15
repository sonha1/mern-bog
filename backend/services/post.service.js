import _Post from "../models/post.model.js";
import _Comment from "../models/comment.model.js";

export const create = async ({ title, description, content, tag, user }) => {
  const post = await _Post.create({
    title,
    description,
    content,
    tag,
    author: user,
  });
  return post;
};

export const deleteP = async ({ postId }) => {
  try {
    const post = await _Post.findOneAndDelete({ _id: postId });
    return post;
  } catch (error) {
    console.log(error);
  }
};
export const checkAuthor = ({ postId, userId }) => {
  try {
    const check = userId === postId ? 0 : 1;
    return check;
  } catch (error) {
    console.log(error);
  }
};

export const update = async ({ title, content, description, tag, postId }) => {
  const post = await _Post.findOneAndUpdate(
    { _id: postId },
    { title, content, description, tag }
  );
  return post;
};

export const get = async ({ postId }) => {
  const post = await _Post.findById(postId);
  return post;
};

export const like = async ({ userId, postId }) => {
  const post = await _Post.findById(postId);
  let checkExists = false;
  post.like.forEach((ele) => {
    if (ele._id.toString() === userId.toString()) {
      checkExists = true;
    }
  });

  if (checkExists) {
    const like = post.like.filter(
      (element) => element._id.toString() !== userId.toString()
    );
    post.like = like;
    post.countLike();
    await post.save();
    return post;
  }
  post.like.push(userId);
  post.countLike();
  await post.save();
  return post;
};

export const createCmt = async ({ postId, userId, comment }) => {
  const postComment = await _Comment
    .findOne({
      post: postId,
    })
    .populate("comments.user", "name email role");
  if (postComment) {
    // postComment.comments.forEach((cmt) => {
    //   if (cmt.user.toString() === userId.toString()) {
    //     isUserCommented = true;
    //   }
    // });
    const addComment = await _Comment
      .findOne({
        post: postId,
        "comments.user": userId,
      })
      .populate("comments.user", "name email role");

    if (addComment) {
      addComment.countComments();
      addComment.comments.filter((cmt) => {
        if (cmt.user._id.toString() === userId.toString()) {
          return cmt.comment.push({ data: comment });
        }
      });
      await addComment.save();
      // await addComment.save();
      return addComment;
    }
    postComment.comments.push({
      user: userId,
      comment: {
        data: comment,
      },
    });
    postComment.countComments();
    await postComment.save();
    return postComment;
  }
  let createComment = await _Comment.create({
    post: postId,
    comments: { user: userId, comment: { data: comment } },
  });

  // createComment.countComments();

  return createComment;
};

export const deleteCmt = ({}) => {};

export const editComment = ({}) => {};
