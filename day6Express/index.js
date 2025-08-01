const express = require("express")
let app = express()
let fs = require('fs');

app.use(express.json())   // express.text()  // parse http req body


// middleware function
function fun(req,res,next){
    req.custom = "custom thing"  // can change the req object using this
    console.log("hello");
    next()  /// for next code execution
}

app.use(fun) // middleware calling

// app.get("path",middlewareFunName,hanler)  // this is the another way to call middleware


//middleware function for saving date and time in file 
function logDetails(req,res,next){
let data = Date.now().toLocaleString() + " " + req.method
fs.appendFile(__dirname + "/index.txt" , `${data}\n` , (err)=>{
    next()
})
}

// simple method of route with middleware calling 
app.get("/",logDetails,(req,res)=>{
    console.log(req.body);
    console.log(req.custom);
    return res.status(200).json({"message" : "get method"})
})


// error handling for wrong url path request
app.use((req,res,next)=>{

    res.status(500).json({message: "url not found"})
})

// error handling of wrong code in method of http code
// this called global error handling, catches similar to try catch
app.use((err, req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("something broke")
})

app.listen(3000, ()=>{
    console.log("server started");
    
})