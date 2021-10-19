import express from 'express';
import { SubTasks } from '../db/models/subTasks';

const router = express.Router();

//get all subtasks under a task
router.get("/getAll/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    const task = await SubTasks.query()
        .select("*")
        .where({ taskId });

    res.json(task);
});

//create a new subtasks under a task
router.post("/create/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    const subTask = req.body;

    if (req.body === undefined) { return }

    const newSubTask = await SubTasks.query()
        .insert({
            title: subTask.title,
            taskId: taskId
        })
        .where({ taskId })
        .returning("*");

    res.send({ subTask: newSubTask });
});

//update completed status
router.patch("/complete/:subTaskId", async (req, res) => {
    const subTaskId = req.params.subTaskId;
    const subTask = req.body;

    const updateSubTask = await SubTasks.query()
        .update({
            completed: subTask.completed
        })
        .where({ subTaskId })
        .returning("*")
        .first();

    res.json({subTask: updateSubTask});
});

//delete a subtask
router.delete("/delete/:subTaskId", async (req, res) => {
    const subTaskId = req.params.subTaskId;
    await SubTasks.query()
        .delete()
        .where({ subTaskId });

    res.json("subTask deleted.");
});

//delete subtasks under a task
router.delete("/deleteAll/:taskId", async (req, res) => {
    const taskId = req.params.taskId;

    await SubTasks.query()
        .delete()
        .where({ taskId });

    res.json(`all subTasks under task deleted.`);
});

export default router;

