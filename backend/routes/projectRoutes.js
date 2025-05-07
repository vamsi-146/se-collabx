const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); // You'll need to create this model

// Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new project
router.post('/', async (req, res) => {
  const project = new Project(req.body);
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update project bookmark status (example of a specific project action)
router.patch('/:id/bookmark', async (req, res) => {
  try {
    // In a real app, you would update a user's bookmarks collection
    // This is just a placeholder
    res.json({ success: true, message: 'Bookmark status updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;