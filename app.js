// app.js
// This is the main file that starts my Assignment Tracker app

// load environment variables
require("dotenv").config();

// import the packages I installed
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");

// import my database connection file
const connectDB = require("./config/db");

// import my assignments routes
const assignmentRoutes = require("./routes/assignments");

// create the express app
const app = express();

// connect to my database
connectDB();

// let express read data from forms
app.use(express.urlencoded({ extended: true }));

// allow PUT and DELETE using ?_method=
app.use(methodOverride("_method"));

// set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// home page route
app.get("/", (req, res) => {
  res.render("index");
});

// use the assignments routes for any /assignments path
app.use("/assignments", assignmentRoutes);

// start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on http://localhost:3000");
});
