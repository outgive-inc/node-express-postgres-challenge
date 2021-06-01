const express = require("express");
const { getAllTasks } = require("../models/queries/tasks");

const router = express.Router();

router.get("/api/v1/tasks", async (req, res) => {
  const tasks = await getAllTasks();

  res.send(tasks);
});

module.exports = router;
