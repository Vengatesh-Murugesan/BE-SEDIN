const Project = require("../models/project");

// Create a new project
exports.createProject = async (req, res) => {
  try {
    if (!req.body.name || !req.body.description) {
      return res
        .status(400)
        .json({ message: "Project name and description are required." });
    }
    const project = await Project.create({
      ...req.body,
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Retrieve a list of all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Retrieve a single project by ID
exports.getProjectById = async (req, res) => {
  res.json(res.project);
};

// Update a project by ID
exports.updateProjectById = async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res
      .status(400)
      .json({ message: "Project name and description are required." });
  }

  if (req.body.name != null) {
    res.project.name = req.body.name;
  }
  if (req.body.description != null) {
    res.project.description = req.body.description;
  }
  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a project by ID
exports.deleteProjectById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDocument = await Project.findByIdAndDelete(id);
    res.json({ message: "Deleted project" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
