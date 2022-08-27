const express = require("express");
const router = new express.Router();

const taskController = require("../controllers/taskController");

router.post("/task", taskController.CreateTask);
router.get("/tasks", taskController.GetTaskList);
router.put("/task", taskController.UpdateTask);
router.delete("/task", taskController.DeleteTask);

module.exports = router;
