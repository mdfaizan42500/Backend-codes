const express = require("express");
let app = express();
let fs = require('fs');
app.use(express.json()); // used for validation and pasing the data from frontend

// setting the path of todos.json file
let path = __dirname + "/todos.json"




// creating get method to show all todos from array
app.get("/todos", (req, res) => {
  try {
    //reading file data and giving all data in response
    fs.readFile(path,{encoding : "utf-8"} ,(err,todos)=>{
      todos = todos ? JSON.parse(todos) : []
       return res.status(200).json({ todos }) 
    })
   
  } catch (error) {
    return res.status(500).send("try again");
  }
});

// creating a post method to create a new todo
app.post("/todos", (req, res) => {
  try {
    //first reading file data then writing new data
    fs.readFile(path , {encoding : "utf-8"},(err,todos)=>{
      todos = todos ? JSON.parse(todos) : []
      todos.push({ ...req.body, isComplete: false, id: todos.length + 1 });
      //writing new data
      fs.writeFile(path, JSON.stringify(todos) ,{encoding : "utf-8"} , (err)=>{
        if(err){
          return res.status(500).send("try again"); 
        }else{
          return res.status(200).json({ message: "todo added / created successfully" });
        }
      })
      
    })
} catch (error) {
    return res.status(500).send("try again");
  }
});

//deleting a todo with the help of id
app.delete("/todos/:id", (req, res) => {
  try {
    // using splice
    // todos.splice(Number(req.params.id) - 1 , 1)
    //OR
    //using filter method
    fs.readFile(path,{encoding:"utf-8"},(err , todos)=>{
         todos = todos? JSON.parse(todos) : []
      let filteredTodo = todos.filter((todo) => todo.id != req.params.id);
      fs.writeFile(path,JSON.stringify(filteredTodo),{encoding:"utf-8"},  (err)=>{
        if(err){
          return res.status(500).send("try again"); 
        }else{
          return res.status(200).json({ message: "todo deleted successfully" });
        }
      })
    })

  } catch (error) {
    return res.status(500).json({ message: "try again" });
  }
});

// updating a todo
app.put("/todos/:id", (req, res) => {
  try {
    
     fs.readFile(path,{encoding:"utf-8"},(err , todos)=>{
         todos = todos? JSON.parse(todos) : []
      // finding index of todo to be deleted
    let index = todos.findIndex((todo) => todo.id == req.params.id) + 1
    //updating to todo 
    todos[index-1] = {...todos[index-1] , ...req.body}
      fs.writeFile(path,JSON.stringify(todos),{encoding:"utf-8"},  (err)=>{
        if(err){
          return res.status(500).send("try again"); 
        }else{
       return res.status(200).json({ message : "todo updated successfully" });
        }
      })
    })
  } catch (error) {
    return res.status(500).send("try again");
  }
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "everything fine" });
});

app.listen(3000, () => {
  console.log("server started");
});
