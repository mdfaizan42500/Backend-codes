const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

// function to create blog
async function createBlog(req, res) {
  try {
    // here creator has the id of user which is coming from verifying jwt
    const creator = req.user;

    const { title, description, draft } = req.body;
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "enter title",
      });
    }
    if (!description) {
      return res.status(400).json({
        success: false,
        message: "enter description",
      });
    }

    // finding if the given user id exist in user database or not
    const findUser = await User.findById(creator);

    if (!findUser) {
      return res.status(500).json({
        success: false,
        error: "creator does not exist",
      });
    }

    // creating the blog with all these details
    const blog = await Blog.create({ title, description, draft, creator });

    // updating the user that he just uploaded the blog so providing id of that blog to user
    await User.findByIdAndUpdate(creator, { $push: { blogs: blog._id } }); // we are writing $push to push the updated thing in array

    return res.status(200).json({
      success: true,
      message: "blog created successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to get blog
async function getBlogs(req, res) {
  try {
    const blogs = await Blog.find({ draft: false }).populate({
      path: "creator",
      select: "name",
    }); // here populate give the object of given id

    return res.status(200).json({
      success: true,
      message: "blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to get blog by id
async function getBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    return res.status(200).json({
      success: true,
      message: "blog fetched successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to update blog
async function updateBlog(req, res) {
  try {
    // taking id for checking is the provided id blog present in db or not
    const { id } = req.params;
// taking creator id to check is the blog containing creator id same or not
    const creator = req.user;
    const { title, description, draft } = req.body;

    // finding the blog on the basis of id
    const blog = await Blog.findById(id)

     
    if(!(creator == blog.creator)){
         return res.status(500).json({
      success: false,
      error: "You are not authorized for this action",
    });
    }


    //updating the blog
   // commenting this because we will use another method for at as it is not returning the updated blog because  of updateOne method
    // const updatedBlog = await Blog.updateOne(
    //   { _id: id },
    //   {
    //     title,
    //     description,
    //     draft,
    //   },
    //   { new: true }
    // );

    // using this to update the blog and return it
    blog.title = title || blog.title 
    blog.description = description || blog.description
    blog.draft = draft || blog.draft
    blog.save()


    return res.status(200).json({
      success: true,
      message: "blog updated successfully",
      blog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

// function to delete blog
async function deleteBlog(req, res) {
  try {
    const { id } = req.params;
    const creator = req.user

    const blog = await Blog.findById(id);
    if(!blog){
       return res.status(500).json({
      success: false,
      error: "Blog not found",
    });
    }

    if(!(creator == blog.creator)){
       return res.status(500).json({
      success: false,
      error: "You are not authorized for this action",
    });
    }
    
     await Blog.findByIdAndDelete(id)

    // deleting the id of blog from user document 
    await User.findByIdAndUpdate(creator , {$pull : {blogs : id}}) 

    return res.status(200).json({
      success: true,
      message: "blog deleted successfully",
      deleteBlog,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog };
