const express = require("express");
const router = express.Router();
const Task = require("../model/task");

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single task by ID
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) throw new Error("Task not found");
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update a task by ID
router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) throw new Error("Task not found");
    res.json(task);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a task by ID
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) throw new Error("Task not found");
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
