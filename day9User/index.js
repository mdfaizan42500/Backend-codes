const express = require('express');
let app = express()
const cors = require('cors');
const mongoose = require('mongoose');

// cors to provide data to fronted 
app.use(cors())
app.use(express.json())




//connecting to database 
async function connectDB() {
   try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blogDatabase")
    console.log("databse connected successfully")
} catch (error) {
    console.log("database not connected", error)
} 
}


// creating user schema and model
const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true
    },
    password : String
})

//creating model
const User = mongoose.model("user", userSchema)


// users route

// for registering new users
app.post("/users",async (req,res)=>{
    let {name , email , password} = req.body
    // checking if any detail missing
    try {
        if(!name){
            return res.status(400).json({
            success : false,
            message : "Please enter name"
        })
        }
        if(!email){
            return res.status(400).json({
            success : false,
            message : "Please enter email"
        })
        }
        if(!password){
            return res.status(400).json({
            success : false,
            message : "Please enter password"
        })
        } 

        // giving all data in users array 
        // users.push({...req.body , id : users.length + 1}) // but now we are using database


         // checking if user already exist 
        const checkUserExist = await User.findOne({email})
        if(checkUserExist){
            return res.status(400).json({
                success : false,
                message : "user already exist with this email"
            })
        }

        //creating user in databe
        const newUser = await User.create({
            // if key and value is same then writing them only once
            name,
            email,
            password
        })
        
        return res.status(200).json({
            success : true,
            message : "user registered successfully" , 
            newUser
        })
    } catch (error) {
       return res.status(500).json({
            success : false,
            message : "Please try again"
            
        })
    }
})

// getting users details
app.get("/users",async (req,res)=>{
    try {
        const users = await User.find({})

        return res.status(200).json({
            success : true,
            message : "users fetched successfully",
            users
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching the users"
        })
    }
})

// getting users details by id
app.get("/users/:id",async (req,res)=>{

    // filtering the user on the basis of id
    //  let filteredUser = users.filter(user => user.id == req.params.id)
     // checking if the required user is not available the return false
    
    try {
        const id = req.params.id
        // const user = await User.findOne({_id : id}) // this is fine and will give the user but if id is wrong the error will be something madup
        const user = await User.findById(id)  // this will not give user but if id is wrong give my error
        console.log(user)
        if(!user){
            return res.status(500).json({
                success : false,
                message : "user not find"
            })
        }

        return res.status(200).json({
            success : true,
            message : "user fetched successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching the user",
            error : error.message
        })
    }
})

// updating user detail 
app.patch("/users/:id",async (req,res)=>{
    let {id} = req.params


    //this is for user array without database
    // finding the index of user and updating that particular in users array
    // let index = users.findIndex(user => user.id == id ) 
    // users[index] = {...users[index] , ...req.body}

    //OR
    // finding the user on the basis of id and then in main at its index update that else remain it asitis
    // here updateduser is a new array in which our updated user data is present

    // let updateduser = users.map((user , index)=> user.id == id ? ({...users[index] , ...req.body}) : user)
    // users = [...updateduser]
    
    try {
        let {name , password , email} = req.body
        let updatedUser = await User.findByIdAndUpdate(id , {name , password , email} , {new : true} ) // new true is written to give the updated user in console else it will give old one

            if(!updatedUser){
                return res.status(500).json({
                    success : false,
                    message : "user not found",
                })
            }

        return res.status(200).json({
            success : true,
            message : "user updated successfully",
            updatedUser
        })
    } catch (error) {
         return res.status(500).json({
            success : false,
            message : "Error occured while updating the user"
        })
    }
})


// delete user detail
app.delete("/users/:id",async (req,res)=>{
    let {id} = req.params
  
     try {
         let deletedUser = await User.findByIdAndDelete(id)
          if(!deletedUser){
                return res.status(500).json({
                    success : false,
                    message : "user not found",
                })
            }
        return res.status(200).json({
            success : true,
            message : "user deleted successfully",
            deletedUser
        })
    } catch (error) {
         return res.status(500).json({
            success : false,
            message : "Error occured while deleting the user"
        })
    }
})


// blogs route
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
    console.log("Server started")
    connectDB()
})