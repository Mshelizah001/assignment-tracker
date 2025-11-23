// routes/assignments.js
// this file handles all assignment-related routes

const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// show all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find().sort({ dueDate: 1 });
    res.render("assignments/index", { assignments });
  } catch (err) {
    console.log("Error loading assignments:", err.message);
    res.send("Error loading assignments");
  }
});

// show form to create a new assignment
router.get("/new", (req, res) => {
  res.render("assignments/new");
});

// show form to edit an assignment
router.get("/:id/edit", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.render("assignments/edit", { assignment });
  } catch (err) {
    console.log("Error loading edit form:", err.message);
    res.send("Error loading edit form");
  }
});

// show delete confirmation page
router.get("/:id/delete", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    res.render("assignments/delete", { assignment });
  } catch (err) {
    console.log("Error loading delete page:", err.message);
    res.send("Error loading delete page");
  }
});

// create a new assignment
router.post("/", async (req, res) => {
  try {
    await Assignment.create(req.body);
    res.redirect("/assignments");
  } catch (err) {
    console.log("Error creating assignment:", err.message);
    res.send("Error creating assignment");
  }
});

// update an existing assignment
router.put("/:id", async (req, res) => {
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

// delete an assignment
router.delete("/:id", async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect("/assignments");
  } catch (err) {
    console.log("Error deleting assignment:", err.message);
    res.send("Error deleting assignment");
  }
});

module.exports = router;
