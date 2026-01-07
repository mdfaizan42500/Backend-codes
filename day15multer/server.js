const express = require('express');
const app = express()
app.use(express.json())

// requiring multer 
const multer = require('multer');
// takin path to use in multer
const path = require('path');

// this is made to pass in the upload variable
const storage = multer.diskStorage({
//1. destination where the file will be uploaded
destination : "uploads",
//2. filename should be unique
filename : function (req , file , cb){
        cb(null , Date.now() + path.extname(file.originalname))
} 
})


// main multer function
const upload = multer({
    // this is from upper side
    storage,
    // limit for the size of file to be uploaded
    limits : {
        fileSize : 1000000
    }
}).single("image") //.single is used to send only a single file and if we want to send multiple file then we use array and image is the name of field present in the frontend

app.post("/imageUpload",(req,res)=>{
    //using the uplad function to give the file
    upload(req,res,function(err){
        if(err instanceof multer.MulterError){
              res.status(400).json({success : false,
        message : err})
        } else if(err){
             res.status(400).json({success : false,
        message : err.message})
        }
         if(!req.file){
            res.status(400).json({success : false,
        message : "file not found"})
         }
    })
   


    res.status(200).json({
        success : true,
        message : "Image uploaded successfully"
    })
})


app.listen(3000,()=>{
    console.log("server started successfully")
})