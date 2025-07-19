const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
 // Load environment variables
const userRoutes=require('./routes/userRoute');

const port = process.env.PORT || 3001;
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use("/api/user",userRoutes);

connectDB(); // Connect to MongoDB

app.get('/', (req, res) => {
  res.send('Hello Quicknotes!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
