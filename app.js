// app.js
// This is the main file that starts my Assignment Tracker app

// load environment variables
require("dotenv").config();

// import the packages I installed
const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const session = require("express-session");   // NEW
const passport = require("passport");         // NEW

// import my database connection file
const connectDB = require("./config/db");

// import my routes
const assignmentRoutes = require("./routes/assignments");
const authRoutes = require("./routes/auth");  // NEW – we will create this file

// load passport config
require("./config/passport")(passport);       // NEW

// create the express app
const app = express();

// connect to my database
connectDB();

// let express read data from forms
app.use(express.urlencoded({ extended: true }));

// allow PUT and DELETE using ?_method=
app.use(methodOverride("_method"));

// SESSION middleware (must be before passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport and session handling
app.use(passport.initialize());
app.use(passport.session());

// make the logged-in user available in all EJS templates as "user"
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// serve files in the public folder
app.use(express.static(path.join(__dirname, "public")));

// home page route
app.get("/", (req, res) => {
  res.render("index");
});

// auth routes (login with Google/GitHub, logout)
app.use("/", authRoutes);              // NEW

// use the assignments routes for any /assignments path
app.use("/assignments", assignmentRoutes);

// start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on http://localhost:3000");
});
