const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        unique : true
    },
    password : String,
    blogs : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "blog"
        }
    ],
        isVerified : {
        type : Boolean,
        default : false,
    }
})

const User = mongoose.model("user" , userSchema)

module.exports = User