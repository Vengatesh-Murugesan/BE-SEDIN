const Task = require("../models/task");
const Project = require("../models/project");

// Create a new task for a project
exports.createTask = async (req, res) => {
  try {
    if (
      !req.body?.name ||
      !req.body?.status ||
      !req.body?.description ||
      !req.body?.project
    ) {
      return res.status(400).json({
        message:
          "All fields (name, status, description, project) are required.",
      });
    }
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const task = new Task({
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      project: project._id,
    });
    await task.save();
    project.tasks.push(task);
    await project.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Retrieve all tasks for a project
exports.getTasksByProjectId = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to fetch task by ID
const getTaskById = async (taskId) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

// Retrieve a single task by ID
exports.getTaskById = async (req, res) => {
  try {
    const task = await getTaskById(req.params.id);
    res.json(task);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Update a task by ID
exports.updateTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    if (
      (!req.body?.name || !req.body?.description || !req.body?.status,
      !req.body?.project)
    ) {
      return res.status(400).json({
        message: "All fields (name, description, status,project) are required.",
      });
    }
    let task = await getTaskById(taskId);

    if (req.body.name != null) {
      task.name = req.body.name;
    }
    if (req.body.description != null) {
      task.description = req.body.description;
    }
    if (req.body.status != null) {
      task.status = req.body.status;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a task by ID
exports.deleteTaskById = async (req, res) => {
  const taskId = req.params.id;
  try {
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    const project = await Project.findOneAndUpdate(
      { tasks: taskId },
      { $pull: { tasks: taskId } }
    );

    res.json({ message: "Deleted task", deletedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "All tasks deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
