const db = require("../config/db");

// Create a new idea
exports.createIdea = (userId, title, description, callback) => {
  const sql =
    "INSERT INTO ideas (user_id, title, description) VALUES (?, ?, ?)";
  db.query(sql, [userId, title, description], callback);
};

// Get all ideas (public)
exports.getAllIdeas = (callback) => {
  const sql =
    "SELECT ideas.*, users.email FROM ideas JOIN users ON ideas.user_id = users.id ORDER BY ideas.created_at DESC";
  db.query(sql, callback);
};

// Get ideas by user
exports.getIdeasByUser = (userId, callback) => {
  const sql = "SELECT * FROM ideas WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [userId], callback);
};

// Get idea by ID
exports.getIdeaById = (id, callback) => {
  const sql = "SELECT * FROM ideas WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Update idea
exports.updateIdea = (id, userId, title, description, status, callback) => {
  const sql =
    "UPDATE ideas SET title = ?, description = ?, status = ?, updated_at = NOW() WHERE id = ? AND user_id = ?";
  db.query(sql, [title, description, status, id, userId], callback);
};

// Delete idea
exports.deleteIdea = (id, userId, callback) => {
  const sql = "DELETE FROM ideas WHERE id = ? AND user_id = ?";
  db.query(sql, [id, userId], callback);
};

// Get idea statistics for dashboard
exports.getIdeaStats = (callback) => {
  const sql = `SELECT 
    COUNT(*) AS total,
    SUM(status = 'Pending') AS pending,
    SUM(status = 'In Progress') AS in_progress,
    SUM(status = 'Completed') AS completed
    FROM ideas`;
  db.query(sql, callback);
};
