const { Task, SubTask } = require("../models");

module.exports = {
  GetTaskList: async (req, res) => {
    try {
      const tasks = await Task.findAll({
        include: [{ model: SubTask, as: "SubTasks" }],
      });
      res.status(200).send({ code: 200, data: tasks, message: "Success" });
    } catch (error) {
      res.send(error);
    }
  },

  CreateTask: async (req, res) => {
    try {
      console.log("req.bodu", req.body);
      if (!req.body.title) {
        return res
          .status(400)
          .send({ data: [], message: "Title is requied", success: false });
      }

      const task = await Task.create(req.body);
      console.log("task", task);
      if (task) {
        res
          .status(200)
          .send({ data: task, message: "Task added", success: true });
      }
    } catch (error) {
      return res.send(error);
    }
  },

  DeleteTask: async (req, res) => {
    try {
      const task = await Task.findById(req.query.taskId);

      if (!task) {
        return res.status(400).send({
          message: "Task not found",
        });
      }

      await task.destroy();
      res
        .status(200)
        .send({ data: [], message: "Task deleted", success: true });
    } catch (error) {
      res.send(error);
    }
  },
  UpdateTask: async (req, res) => {
    try {
      const task = await Task.findById(req.body.taskId);

      if (!task) {
        return res.status(400).send({
          message: "Task not found",
        });
      }
      const updatedTask = await task.update(req.body);
      const { taskId, completed } = updatedTask;

      if (req.body.completed) {
        await SubTask.update({ completed }, { where: { taskId } });
      }

      res
        .status(200)
        .send({ data: updatedTask, message: "Task updated", success: true });
    } catch (error) {
      res.send(error);
    }
  },
};
