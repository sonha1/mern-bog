import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    require: true,
  },
  comments: {
    type: mongoose.Schema.ObjectId,
    ref: "comment",
  },
  like: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        require: true,
      },
    },
  ],
  numOfLikes: Number,
  tag: String,
});

PostSchema.methods.countLike = function () {
  this.numOfLikes = this.like.length;
};

export default mongoose.model("post", PostSchema);
