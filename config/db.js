// db.js
// this file connects my app to MongoDB

const mongoose = require("mongoose");

async function connectDB() {
  try {
    // I read the connection string from my .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection error:", err.message);
  }
}

module.exports = connectDB;
