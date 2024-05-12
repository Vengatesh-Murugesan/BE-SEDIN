const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const Project = require("../models/project");

// Middleware to get project by ID
async function getProject(req, res, next) {
  let project;
  try {
    project = await Project.findById(req.params.id);
    if (project == null) {
      return res.status(404).json({ message: "Project not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.project = project;
  next();
}

// Create a new project
router.post("/", projectController.createProject);

// Retrieve a list of all projects
router.get("/", projectController.getAllProjects);

// Retrieve a single project by ID
router.get("/:id", getProject, projectController.getProjectById);

// Update a project by ID
router.patch("/:id", getProject, projectController.updateProjectById);

// Delete a project by ID
router.delete("/:id", getProject, projectController.deleteProjectById);

module.exports = router;
