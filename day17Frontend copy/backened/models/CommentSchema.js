const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    comment: {
      type: String,
      required: true,
    },
     Likes: [
          { type: mongoose.Schema.Types.ObjectId, 
          ref: "user" }
        ],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
