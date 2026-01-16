const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like" , LikeSchema)

module.exports = Like;
