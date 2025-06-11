const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Register a new user
exports.register = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  userModel.findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (user) return res.status(409).json({ message: "User already exists" });
    userModel.createUser(email, password, (err, result) => {
      if (err) return res.status(500).json({ message: "Registration failed" });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
};

// Login user
exports.login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  userModel.findUserByEmail(email, (err, user) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({ token });
  });
};
