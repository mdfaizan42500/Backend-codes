const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserbyId,
  updateUser,
  deleteUser,
  login,
  verifyToken
} = require("../controllers/userControllers");
// this is for route because we are using app in server.js
const route = express.Router();

// users route

// for registering new users
route.post("/Signup", createUser);

// for login
route.post("/Signin",login)

// getting users details
route.get("/users", getAllUsers);

// getting users details by id
route.get("/users/:id", getUserbyId);

// updating user detail
route.patch("/users/:id", updateUser);

// delete user detail
route.delete("/users/:id", deleteUser);


// verify email/token

route.get("/verify-email/:verificationToken" , verifyToken)


module.exports = route;
