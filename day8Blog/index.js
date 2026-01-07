const express = require('express');
const app = express()
app.use(express.json())

let blogs = []

//to create a new blog
app.post("/blogs",(req,res)=>{
    blogs.push({...req.body , id : blogs.length + 1})
    return res.status(200).json({message : "blog posted successfully"})
})

// to get all blogs
app.get("/blogs",(req,res)=>{
    // giving those blog which are public not draft
    let publicBlog = blogs.filter(blog => !blog.draft)
    return res.json({publicBlog})
})

// to get a particular blog on the basis of id 
app.get("/blogs/:id",(req,res)=>{
    let {id} = req.params
    let searchedBlog = blogs.filter(blog => blog.id == id)
    res.status(200).json({searchedBlog})
})

//to update a blog
app.patch("/blogs/:id",(req,res)=>{
    let {id} = req.params
    // finding index of particular blog so that we will not stuck in index problem
            // let index = blogs.findIndex(blog => blog.id == id)
    //updating thar particular blog
            // blogs[index] = {...blogs[index] , ...req.body}

// OR
// going on every index and checking if id match then update that blog else remain it as it is 
let updatedBlogs = blogs.map((blog , index) => blog.id == id ? ({...blogs[index] , ...req.body}) : blog)
blogs = [...updatedBlogs]
    res.status(200).json({message : "blog updated successfully" , updatedBlogs})
})

// to delete a blog
app.delete("/blogs/:id",(req,res)=>{
    let {id} = req.params
    let filteredBlogs = blogs.filter(blog => blog.id != id)
    blogs = filteredBlogs
    res.status(200).json({message: "bolg deleted successfully"})
})

app.listen(3000,()=>{
    console.log("server started")
})