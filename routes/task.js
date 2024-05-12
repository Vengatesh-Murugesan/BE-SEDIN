const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");

// Create a new task for a project
router.post("/", taskController.createTask);

// Retrieve all tasks for a project
router.get("/project/:projectId", taskController.getTasksByProjectId);

// Retrieve a single task by ID
router.get("/:id", taskController.getTaskById);

// Update a task by ID
router.patch("/:id", taskController.updateTaskById);

// Delete a task by ID
router.delete("/:id", taskController.deleteTaskById);
router.delete("/", taskController.deleteAllTasks);

module.exports = router;
