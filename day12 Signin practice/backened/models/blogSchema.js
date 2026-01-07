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
    required : true,
  },
  draft: {
    type: Boolean,
    default: false,
  },
  creator : {
    type : mongoose.Schema.Types.ObjectId,
    ref: "user",
    required : true,
  },
} , {timestamps : true}); // here timestamps : true will add the time in the entry automatically

const Blog = mongoose.model("blog", blogSchema);


module.exports = Blog