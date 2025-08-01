const http = require("http")
const fs = require("fs")

const server = http.createServer(function(req,res){
    let filepath = __dirname+"/index.html"

    if(req.url == "/" || req.url == "/about"|| req.url == "/contactus"){
        let path = req.url.split("/")[1].toUpperCase()
        fs.readFile(filepath , {encoding : "utf-8"} , (err , data)=>{
        if(err){
            throw new Error("Not found")
        }else{
           data =  data.replace("[path]" , path == "" ? "Muhammad Faizan" : path)
            res.end(data)
        }
    }) } else{
        return res.end(JSON.stringify({message : "not found"}))
    }

    
    
    // res.end("<h1>Muhammad Faizan</h1>")
})

server.listen(3000)