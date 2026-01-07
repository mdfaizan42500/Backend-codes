const express = require('express');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogControllers');
const verifyUser = require('../middlewares/auth');
const route = express.Router()


// blogs route

//to create a new blog
route.post("/blogs",verifyUser,createBlog)

// to get all blogs
route.get("/blogs",getBlogs)

// to get a particular blog on the basis of id 
route.get("/blogs/:id",getBlogById)

//to update a blog
route.patch("/blogs/:id",verifyUser , updateBlog)

// to delete a blog
route.delete("/blogs/:id",verifyUser,deleteBlog)

module.exports = route