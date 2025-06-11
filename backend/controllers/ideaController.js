const ideaModel = require("../models/ideaModel");

// Create a new idea
exports.createIdea = (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.id;
  if (!title) return res.status(400).json({ message: "Title is required" });
  ideaModel.createIdea(userId, title, description, (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to create idea" });
    res.status(201).json({ message: "Idea created successfully" });
  });
};

// Get all ideas (public)
exports.getAllIdeas = (req, res) => {
  ideaModel.getAllIdeas((err, results) => {
    if (err) return res.status(500).json({ message: "Failed to fetch ideas" });
    res.json(results);
  });
};

// Get ideas by user
exports.getIdeasByUser = (req, res) => {
  const userId = req.user.id;
  ideaModel.getIdeasByUser(userId, (err, results) => {
    if (err)
      return res.status(500).json({ message: "Failed to fetch user ideas" });
    res.json(results);
  });
};

// Get idea by ID
exports.getIdeaById = (req, res) => {
  const id = req.params.id;
  ideaModel.getIdeaById(id, (err, idea) => {
    if (err) return res.status(500).json({ message: "Failed to fetch idea" });
    if (!idea) return res.status(404).json({ message: "Idea not found" });
    res.json(idea);
  });
};

// Update idea
exports.updateIdea = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const { title, description, status } = req.body;
  ideaModel.updateIdea(
    id,
    userId,
    title,
    description,
    status,
    (err, result) => {
      if (err)
        return res.status(500).json({ message: "Failed to update idea" });
      if (result.affectedRows === 0)
        return res
          .status(403)
          .json({ message: "Not authorized or idea not found" });
      res.json({ message: "Idea updated successfully" });
    }
  );
};

// Delete idea
exports.deleteIdea = (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  ideaModel.deleteIdea(id, userId, (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to delete idea" });
    if (result.affectedRows === 0)
      return res
        .status(403)
        .json({ message: "Not authorized or idea not found" });
    res.json({ message: "Idea deleted successfully" });
  });
};

// Get dashboard stats
exports.getIdeaStats = (req, res) => {
  ideaModel.getIdeaStats((err, stats) => {
    if (err) return res.status(500).json({ message: "Failed to fetch stats" });
    res.json(stats[0]);
  });
};
