const express = require("express")
const app = express()
let path = require("path");  // path.join(__dirname , "index.html") will give us dirname/filename "/ this thing"
let fs = require("fs")

// app.method(path , handler)
//   res.sendFile(path.join(__dirname, 'index.html'));


function dynamicData(req , res , route){
fs.readFile(__dirname +"/index.html" , {encoding : "utf-8"} , (err , data)=>{
    if(err){
        throw new Error("not found")
    }else{
        
        data = data.replace("[path]" , route == "" ? "Muhammad Faizan" : route)
        res.end(data)
    }
})
}

app.get(["/" ,"/about" ,"/contactus" ], (req , res)=> {
    // dynamicData(req , res , "")
    let path = req.url.split("/")[1].toUpperCase()
    fs.readFile(__dirname +"/index.html" , {encoding:"utf-8"} , (err , data)=>{
        if(err){
            throw new Error("file not found")
        }else{
         data = data.replace("[path]" , path == "" ? "Muhammad Faizan" : path)
            res.status(200).send(data)
        }
    })
})

// app.get("/about" , (req,res)=> {
//     dynamicData(req , res , "about")
// })
// app.get("/contactus" , (req,res)=> {
//    dynamicData(req , res , "contactus")
// })



app.listen(3000, ()=>{
    console.log("server is running");
    
})