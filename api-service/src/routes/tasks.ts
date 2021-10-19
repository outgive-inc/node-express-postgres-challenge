import express from 'express';
import { Tasks } from '../db/models/tasks';

const router = express.Router();
//get all tasks
router.get("/getAll", async (req, res) => {
    const tasks = await Tasks.query()
        .select("*")
        .orderBy("create_date");

        res.json(tasks);
});

//get a task
router.get("/get/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    const task = await Tasks.query()
        .select("*")
        .where({ taskId })
        .first();

    res.json(task);
});

//create a new task
router.post("/create", async (req, res) => {
    const task = req.body;

    if (req.body === undefined) { return }

    const newTask = await Tasks.query()
        .insert({
            title: task.title,
            details: task.details,
        })
        .returning("*");

    res.send({ task: newTask });
});

//edit a task, also set a task complete
router.patch("/update/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    const task = req.body;
    
    const updateTask = await Tasks.query()
        .update({
            title: task.title,
            details: task.details,
            completed: task.completed
        })
        .where({ taskId })
        .returning("*")
        .first();

    res.json({task: updateTask});
});

//delete a task
router.delete("/delete/:taskId", async (req, res) => {
    const taskId = req.params.taskId;
    await Tasks.query()
        .delete()
        .where({ taskId });

    res.json("Task deleted.");
});

export default router;

