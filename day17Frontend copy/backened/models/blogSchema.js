const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    blogId :{
      type : String,
      required : true,
      unique : true
    },
    draft: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: true,
    },
    imageId: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Likes: [
      { type: mongoose.Schema.Types.ObjectId, 
      ref: "user" }
    ],
    Comments : [
      {type : mongoose.Schema.Types.ObjectId,
        ref : "comment",
      }
    ]
  },
  { timestamps: true }
); // here timestamps : true will add the time in the entry automatically

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
