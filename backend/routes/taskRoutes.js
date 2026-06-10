const express = require("express");

const router = express.Router();

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require("../controllers/taskController");

router.post("/", authMiddleware, createTask);

router.get("/", authMiddleware, getTasks);

router.delete("/:id", authMiddleware, deleteTask);

router.put("/:id", authMiddleware, updateTask);
router.patch(
  "/:id/status",
  authMiddleware,
  toggleTaskStatus
);

module.exports = router;