const db = require("../db.config");
const { removeLastComma } = require("../../utils/helper");

exports.createTask = async (task) => {
  const query = `
        INSERT INTO tasks (title, details) VALUES ($1, $2) RETURNING*;
    `;

  const queryParams = [task.title, task.details];

  try {
    const { rows: newTask } = await db.query(query, queryParams);
    return newTask;
  } catch (e) {
    console.error("Failed to create task: ", e);
  }
};

exports.getAllTasks = async () => {
  const query = `SELECT * from tasks`;

  try {
    const { rows: tasks } = await db.query(query);
    return tasks;
  } catch (e) {
    console.error("Failed to get all Tasks: ", e);
  }
};

exports.findTaskById = async (id) => {
  const query = `SELECT * FROM tasks WHERE tasks.id=$1;`;

  try {
    const { rows: task } = await db.query(query, [id]);
    return task[0];
  } catch (e) {
    console.error("Failed to get task by id: ", e);
  }
};

exports.updateTaskById = async (id, task) => {
  let query = `UPDATE tasks SET `;
  const queryParams = [];

  if (task.title) {
    queryParams.push(task.title);
    query += `title=$${queryParams.length}, `;
  }

  if (task.details) {
    queryParams.push(task.details);

    query += `details=$${queryParams.length}, `;
  }

  if (task.completed !== undefined) {
    queryParams.push(task.completed);
    query += `completed=$${queryParams.length}, `;
  }

  let updateQuery = removeLastComma(query);

  if (id) {
    queryParams.push(id);
    updateQuery += ` WHERE id=$${queryParams.length} RETURNING*`;
  }

  try {
    const { rows: updatedTask } = await db.query(updateQuery, queryParams);
    return updatedTask[0];
  } catch (e) {
    console.error("Failed to update task by id: ", e);
  }
};

exports.deleteTaskById = async (id) => {
  const query = `DELETE FROM tasks WHERE tasks.id=$1 RETURNING*;`;

  try {
    const { rows: deletedTask } = await db.query(query, [id]);
    return deletedTask[0];
  } catch (e) {
    console.error("Failed to delete task");
  }
};
