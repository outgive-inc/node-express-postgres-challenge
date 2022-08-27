const express = require("express");
const router = new express.Router();

const subTaskController = require("../controllers/subtaskController");

router.post("/sub-task", subTaskController.CreateSubTask);
router.get("/sub-tasks", subTaskController.GetSubTasks);
router.update("/sub-task", subTaskController.UpdateSubTask);
router.delete("/sub-task", subTaskController.DeleteSubTask);

module.exports = router;
