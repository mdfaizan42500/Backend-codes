const mongoose = require('mongoose');

async function dbConnect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/blogDatabase")
        console.log("database connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = dbConnect