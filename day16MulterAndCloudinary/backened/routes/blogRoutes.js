const express = require("express");
const {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  LikeBlog
} = require("../controllers/blogControllers");
const verifyUser = require("../middlewares/auth");
const { addComment, deleteComment, editComment, likeCommment } = require("../controllers/commentController");
const upload = require("../utils/multer");
const route = express.Router();

// blogs route

//to create a new blog
route.post("/blogs", verifyUser, upload.single("image"), createBlog);
// to get all blogs
route.get("/blogs", getBlogs);
// to get a particular blog on the basis of id
route.get("/blogs/:id", getBlogById);
//to update a blog
route.patch("/blogs/:id", verifyUser, updateBlog);
// to delete a blog
route.delete("/blogs/:id", verifyUser, deleteBlog);
// to like or unlike a blog
route.post("/blogs/like/:id", verifyUser , LikeBlog)



// to add comment on blog
route.post("/blogs/comment/:id", verifyUser , addComment)
// to delete comment on blog
route.delete("/blogs/comment/:id", verifyUser , deleteComment)
//to edit the comment
route.patch("/blogs/edit-comment/:id" , verifyUser , editComment)
//to like or unlike the comment
route.post("/blogs/like-comment/:id" , verifyUser , likeCommment)

module.exports = route;
