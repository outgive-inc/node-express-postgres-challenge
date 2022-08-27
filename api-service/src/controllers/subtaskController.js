const { Task, SubTask } = require("../models");

module.exports = {
  GetSubTasks: async (req, res) => {
    try {
      const subTasks = await SubTask.findAll({ include: Task });
      res.status(200).send({ code: 200, data: subTasks, message: "Success" });
    } catch (error) {
      res.send(error);
    }
  },

  CreateSubTask: async (req, res) => {
    try {
      if (!req.body.title) {
        return res
          .status(400)
          .send({ data: [], message: "Title is requied", success: false });
      }

      const { taskId } = req.body;

      const task = await Task.findByPk(taskId);

      if (!task)
        return res.status(400).send({
          message: "Task not found",
        });

      const subTask = await SubTask.create(req.body);

      if (subTask) {
        res
          .status(200)
          .send({ data: subTask, message: "Sub Task added", success: true });
      }
    } catch (error) {
      return res.send(error);
    }
  },

  DeleteSubTask: async (req, res) => {
    try {
      const subTask = await SubTask.findByPk(req.query.subTaskId);

      if (!subTask)
        return res.status(404).send({ message: "Subtask does not exist" });

      await subTask.destroy();

      res
        .status(200)
        .send({ data: [], success: true, message: "Sub-subTask deleted!" });
    } catch (error) {
      res.status(400).send(error);
    }
  },

  UpdateSubTask: async (req, res) => {
    try {
      const subTask = await SubTask.findByPk(req.params.subTaskId);

      if (!subTask)
        return res.status(400).send({ message: "Sub-task does not exist!" });

      const updatedSubTask = await subTask.update(req.body);
      const { taskId } = updatedSubTask;

      if (req.body.completed) {
        const { count: remainingSubTaskCount } = await SubTask.findAndCountAll({
          where: { taskId, completed: false },
        });
        await Task.update(
          { completed: remainingSubTaskCount === 0 },
          { where: { taskId } }
        );
      }

      res.status(200).send(updatedSubTask);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
