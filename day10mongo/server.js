const express = require('express');
const app = express()
// requiring mongoose to connect server with databse
const mongoose = require('mongoose');

// function to connect db 
async function connectdB() {
    try {
        // giving uri of database ("in future for deploying it will be of cloud id")
        await mongoose.connect("mongodb://localhost:27017/Firstdb")
        console.log("db connected succesfully")
    } catch (error) {
        console.log(error)
    }
}

// creating a user schema 
const userSchema = new mongoose.Schema({
    name : String,
    email : {
        // defining validations
        type : String,
        required : true,
        unique : true
    },
    password : String
})

// creating a model from schema
const User = mongoose.model("user",userSchema)

// creating a user by function
async function createUser() {

    //method 1 to create a user
    try {
        let newUser = await User.create({
        name : "Muhammad Faiza",
        email : "faizan@gmail.com",
        password : "password"
    })
    console.log("user created successfully" , newUser)
    } catch (error) {
        console.log(error.code)
    }
    

    // method 2 to create a user
    // let newUser = new User({
    //     name : "Muhammad Faiza 1",
    //     email : "faizan@gmail.com 1",
    //     password : "password 1"
    // })
    // await newUser.save()
    // console.log("user created successfully" , newUser)


    // reading databse 
    //to read all the data
    // const user = await User.find()

    // to read by id
    // const user = await User.findById("6894815fca4b9d66dd079ba8")

    // to read from an entity
    // const user = await User.findOne({name : "Muhammad Faiza 1"})

    // to update an entity
    // const user = await User.findByIdAndUpdate("689482011ffbd33664b4d635" , {
    //     name : "Updated name"
    // } , {new : true})
    // console.log(user)

}


app.listen(3000,()=>{
    console.log("server started")
    connectdB()
    createUser()
})