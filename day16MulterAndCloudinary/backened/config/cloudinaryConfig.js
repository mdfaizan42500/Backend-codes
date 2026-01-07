const cloudinary = require('cloudinary').v2

// function to connect with cloudinary
 async function cloudinaryConfig() {
    try {
        // pasting this from its website
    cloudinary.config({ 
        cloud_name: 'dzvjdhwck', 
        api_key: '414232345875159', 
        api_secret: 'BvEmvtZgSlFtaGFiRtp8hko3Zk8' 
    });
    console.log("cloudinary configuration successfull")
    } catch (error) {
        console.log("error while connecting to cloudinary")
        console.log(error)
    }
    
 }

 module.exports = cloudinaryConfig