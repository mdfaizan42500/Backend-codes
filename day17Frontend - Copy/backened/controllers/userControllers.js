const User = require("../models/userSchema")
const bcrypt = require('bcrypt');
const {generateJWT , verifyToken} = require("../utils/generateToken");


//creating the logic of user creation
async function  createUser(req,res) {
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

        // hashing the password before creating all the detail of new user
        const hashedpassword = await bcrypt.hash(password , 10)

        //creating user in databe
        const newUser = await User.create({
            // if key and value is same then writing them only once
            name,
            email,
            password : hashedpassword
        })

        //providing jwt 
        let token = await generateJWT({
            email : newUser.email,
            id : newUser._id
        }) // passing the data as payload
        
        return res.status(200).json({
            success : true,
            message : "user logged in successfully" , 
           user : {
            id : newUser._id,
            name : newUser.name,
            email : newUser.email,
            token
           },
           
        })
    } catch (error) {
       return res.status(500).json({
            success : false,
            message : "Please try again"
            
        })
    }
}

// creating login function
async function login(req,res) {
    try {
        const {email , password} = req.body

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

        const checkForExistingUser = await User.findOne({email})

       if(!checkForExistingUser){
            return res.status(400).json({
                success : false,
                message : "user not registered"
            })
        }

        //comparing password using bcrypt
        let checkPass = await bcrypt.compare(password , checkForExistingUser.password)

        // checking if the password is same or not 
        if(!checkPass){
             return res.status(400).json({
                success : false,
                message : "wrong credentials"
            })
        }

        //providing token to it also 
        let token = await generateJWT({
            email : checkForExistingUser.email,
            id : checkForExistingUser._id
        })

         return res.status(200).json({
            success : true,
            message : "user logged in successfully" , 
             user : {
                id : checkForExistingUser._id,
            name : checkForExistingUser.name,
            email : checkForExistingUser.email,
             token
           },
          
           
        })

    } catch (error) {
         return res.status(500).json({
            success : false,
            error : error.message,
            message : "Please try again"
            
        })
    }
}

//creating the logic of getting all users
async function getAllUsers(req,res) {
    try {
        const users = await User.find({})      //we can do this if we don't want to show password  .select("-password")

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
}

//creating the logic of getting only one user
async function getUserbyId(req,res) {

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
}

//creating the logic of updating user
async function updateUser(req,res) {
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
}

//creating the logic of deleting user
async function deleteUser(req,res){
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
}

module.exports = {createUser , getAllUsers ,getUserbyId, updateUser ,deleteUser , login}