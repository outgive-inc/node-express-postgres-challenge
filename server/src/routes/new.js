const express = require("express");
const { createTask } = require("../models/queries/tasks");

const { validateRequest } = require("../middleware/validateRequest");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/api/v1/tasks",
  [body("title").not().isEmpty().withMessage("Title is required! ")],
  validateRequest,
  async (req, res) => {
    const { title, details } = req.body;

    const task = {
      title,
      details,
    };

    const newTask = await createTask(task);

    res.status(201).send(newTask);
  }
);

module.exports = router;
