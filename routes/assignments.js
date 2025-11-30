// routes/assignments.js
// this file handles all assignment-related routes

const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// middleware to protect routes (only logged-in users)
function ensureAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  // not logged in - send back to home (or show message page if you prefer)
  return res.redirect("/");
}

// ================= PUBLIC ROUTES (VIEW ONLY) ==================

// show all assignments (READ - public)
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ dueDate: 1 });
    res.render("assignments/index", { assignments });
  } catch (err) {
    console.log("Error loading assignments:", err.message);
    res.send("Error loading assignments");
  }
});

// ================= PROTECTED ROUTES (CREATE / UPDATE / DELETE) ==================

// show form to create a new assignment (CREATE - protected)
router.get("/new", ensureAuth, (req, res) => {
  res.render("assignments/new");
});

// show form to edit an assignment (UPDATE - protected)
router.get("/:id/edit", ensureAuth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.render("assignments/edit", { assignment });
  } catch (err) {
    console.log("Error loading edit form:", err.message);
    res.send("Error loading edit form");
  }
});

// show delete confirmation page (DELETE - protected)
router.get("/:id/delete", ensureAuth, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.render("assignments/delete", { assignment });
  } catch (err) {
    console.log("Error loading delete page:", err.message);
    res.send("Error loading delete page");
  }
});

// create a new assignment (CREATE - protected)
router.post("/", ensureAuth, async (req, res) => {
  try {
    await Assignment.create(req.body);
    res.redirect("/assignments");
  } catch (err) {
    console.log("Error creating assignment:", err.message);
    res.send("Error creating assignment");
  }
});

// update an existing assignment (UPDATE - protected)
router.put("/:id", ensureAuth, async (req, res) => {
  try {
    await Assignment.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.redirect("/assignments");
  } catch (err) {
    console.log("Error updating assignment:", err.message);
    res.send("Error updating assignment");
  }
});

// delete an assignment (DELETE - protected)
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect("/assignments");
  } catch (err) {
    console.log("Error deleting assignment:", err.message);
    res.send("Error deleting assignment");
  }
});

module.exports = router;
