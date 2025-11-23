// Assignment.js
// this file holds the structure of each assignment in my database

const mongoose = require("mongoose");

// this is the layout for one assignment
const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: "Not Started" },
  priority: { type: String, default: "Medium" },
  notes: String,
  createdAt: { type: Date, default: Date.now }
});

// exporting the model so I can use it in routes
module.exports = mongoose.model("Assignment", assignmentSchema);
