const express = require('express');
let app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./config/dbConnect');
const User = require('./models/userSchema');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cloudinaryConfig = require('./config/cloudinaryConfig');

// CORS setup
app.use(cors());


app.use(express.json());

// routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", blogRoutes);

app.listen(3000, () => {
  console.log("Server started");
  dbConnect();
  cloudinaryConfig();
});
