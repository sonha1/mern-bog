import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: true,
    unique: true,
  },
  numOfComments: Number,

  comments: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "user",
        required: true,
        unique: true,
      },
      comment: [
        {
          data: String,
          createdAt: {
            type: Date,
            default: Date.now(),
          },
          updateAt: {
            type: Date,
          },
        },
      ],
    },
  ],
});

CommentSchema.methods.countComments = function () {
  let count = 0;
  this.comments.forEach((cmt) => {
    count += cmt.comment.length;
  });

  this.numOfComments = count;
};

export default mongoose.model("comment", CommentSchema);
