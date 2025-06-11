const express = require("express");
const router = express.Router();
const ideaController = require("../controllers/ideaController");
const auth = require("../middleware/authMiddleware");

// Public route
router.get("/", ideaController.getAllIdeas);

// Protected routes
router.post("/", auth, ideaController.createIdea);
router.get("/my", auth, ideaController.getIdeasByUser);
router.get("/stats", auth, ideaController.getIdeaStats);
router.get("/:id", auth, ideaController.getIdeaById);
router.put("/:id", auth, ideaController.updateIdea);
router.delete("/:id", auth, ideaController.deleteIdea);

module.exports = router;
