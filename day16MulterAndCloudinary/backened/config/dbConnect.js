const mongoose = require('mongoose');
require('dotenv').config();

async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("database connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = dbConnect