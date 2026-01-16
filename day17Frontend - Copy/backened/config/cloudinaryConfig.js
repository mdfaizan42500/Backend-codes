const cloudinary = require('cloudinary').v2
require('dotenv').config();

// function to connect with cloudinary
 async function cloudinaryConfig() {
    try {
        // pasting this from its website
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_SECRET_KEY 
    });
    console.log("cloudinary configuration successfull")
    } catch (error) {
        console.log("error while connecting to cloudinary")
        console.log(error)
    }
    
 }

 module.exports = cloudinaryConfig