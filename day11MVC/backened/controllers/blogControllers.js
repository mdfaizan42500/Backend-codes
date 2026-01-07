const Blog = require("../models/blogSchema")
const User = require("../models/userSchema")
const { verifyToken , decodeJWT } = require("../utils/generateToken")

// function to create blog
async function createBlog(req , res) {
    try {

        //checking the token 
        let isValid = await verifyToken(req.body.token)
    

        if(!isValid){
             return res.status(400).json({
            success : false,
            message : "invalid token",
        })
        }

         // after checking is token valid decoding its data
        let decodedToken = await decodeJWT(req.body.token)
        console.log(decodedToken)

        // here creator has the id of user
        const {title , description , draft , creator} = req.body
        if(!title){
              return res.status(400).json({
            success : false,
            message : "enter title",
        })
        }
        if(!description){
              return res.status(400).json({
            success : false,
            message : "enter description",
        })
        }

        // finding if the given user id exist in user database or not
        const findUser = await User.findById(creator)
        
        if(!findUser){
             return res.status(500).json({
            success : false,
            error : "creator does not exist"
        })
        }
        
        // creating the blog with all these details
        const blog = await Blog.create({title , description , draft , creator})

        // updating the user that he just uploaded the blog so providing id of that blog to user
        await User.findByIdAndUpdate(creator , {$push : {blogs : blog._id}})  // we are writing $push to push the updated thing in array

        return res.status(200).json({
            success : true,
            message : "blog created successfully",
            blog
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

// function to get blog
async function getBlogs(req , res) {
    try {
        const blogs = await Blog.find({draft : false}).populate({
            path : "creator",
            select : "name"
        }) // here populate give the object of given id

          return res.status(200).json({
            success : true,
            message : "blogs fetched successfully",
            blogs
        })
    } catch (error) {
         return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

// function to get blog by id
async function getBlogById(req , res) {
    try {
        const {id} = req.params
        const blog = await Blog.findById(id)

          return res.status(200).json({
            success : true,
            message : "blog fetched successfully",
            blog
        })
    } catch (error) {
         return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

// function to update blog
async function updateBlog(req , res) {
     try {
        const {id} = req.params
        const {title , description , draft} = req.body
        const blog = await Blog.findByIdAndUpdate(id , {title , description , draft} , {new : true})

          return res.status(200).json({
            success : true,
            message : "blog updated successfully",
            blog
        })
    } catch (error) {
         return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

// function to delete blog
async function deleteBlog(req , res) {
     try {
        const {id} = req.params
        const blog = await Blog.findByIdAndDelete(id)

          return res.status(200).json({
            success : true,
            message : "blog deleted successfully",
            blog
        })
    } catch (error) {
         return res.status(500).json({
            success : false,
            error : error.message
        })
    }
}

module.exports = {createBlog , getBlogs , getBlogById , updateBlog , deleteBlog}