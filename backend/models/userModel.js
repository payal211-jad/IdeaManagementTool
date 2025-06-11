const db = require("../config/db");
const bcrypt = require("bcryptjs");

// Create a new user
exports.createUser = (email, password, callback) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, hashedPassword], callback);
};

// Find user by email
exports.findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};
