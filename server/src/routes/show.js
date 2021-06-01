const express = require("express");
const { findTaskById } = require("../models/queries/tasks");

const router = express.Router();

router.get("/api/v1/tasks/:id", async (req, res) => {
  const task = await findTaskById(req.params.id);

  if (!task) {
    res.status(404).send({ msg: "Task not exist" });
  }

  res.send(task);
});

module.exports = router;
