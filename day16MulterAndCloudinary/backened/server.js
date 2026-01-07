const express = require('express');
let app = express()
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const User = require('./models/userSchema');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cloudinaryConfig = require('./config/cloudinaryConfig');
require('dotenv').config();

// Option A: using cors() with options
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  credentials: true
}
app.use(cors(corsOptions))
// ensure OPTIONS (preflight) gets handled
app.options('*', cors(corsOptions))
app.use(express.json())
// this middleware is used to connect route
app.use("/api/v1",userRoutes)
app.use("/api/v1",blogRoutes)

app.listen(process.env.PORT,()=>{
    console.log("Server started")
    dbConnect()
    cloudinaryConfig()
})