const createTasksTable = `
    DROP TABLE IF EXISTS tasks;
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
    CREATE TABLE IF NOT EXISTS tasks (
        ID UUID PRIMARY KEY,
        title TEXT NOT NULL,
        details TEXT,
        completed BOOLEAN DEFAULT false
    );
`;

const getTask = `SELECT * FROM tasks WHERE ID = $1;`;

const getAllTasks = `SELECT title FROM tasks;`;

const createTask =
  "INSERT INTO tasks (ID, title,details) VALUES ($1,$2,$3) RETURNING ID;";

const updateTask =
  "UPDATE tasks SET title = $1, details = $2, completed = $3 WHERE ID = $4;";

const deleteTask = "DELETE FROM tasks WHERE ID = $1;";

module.exports = {
  createTasksTable,
  getTask,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
