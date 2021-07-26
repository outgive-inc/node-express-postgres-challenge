require("dotenv").config();

// Express App Setup
const express = require("express");
const cors = require("cors");

// Initialization
const app = express();
app.use(cors());
app.use(express.json());

// Postgres Client
const { Pool } = require("pg");
const pgClient = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});
pgClient.on("error", () => console.log("Lost Postgres connection"));

// Create initial DB table called task if it does not exist
pgClient.query(
  `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   CREATE TABLE IF NOT EXISTS tasks(
   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
   title VARCHAR(25) NOT NULL,
   details VARCHAR(100),
   completed BOOLEAN DEFAULT FALSE,
   ordernum SERIAL
  );`,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Query is executed");
    }
  }
);

// Express route handlers

// Get all todo tasks
app.get("/api/v1/tasks", async (req, res) => {
  try {
    const allTasks = await pgClient.query(
      "SELECT * FROM tasks ORDER BY ordernum"
    );
    res.json(allTasks.rows);
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
});

// Get a single todo task
app.get("/api/v1/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pgClient.query("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);
    if (task.rowCount !== 0) {
      res.json(task.rows[0]);
    } else {
      res.json({ status: 404, message: "The task does not exist" });
    }
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
});

// Create a todo task
app.post("/api/v1/tasks", async (req, res) => {
  try {
    const task = req.body;
    if (task.title.length !== 0 && task.details.length !== 0) {
      const newTask = await pgClient.query(
        "INSERT INTO tasks (title, details) VALUES($1, $2) RETURNING *",
        [task.title, task.details]
      );
      res.json(newTask.rows[0]);
    } else {
      res.json({ status: 400, message: "Invalid input" });
    }
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
});

// Update a todo task
app.put("/api/v1/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = req.body;
    const updateTask = await pgClient.query(
      "UPDATE tasks SET title = $1, details = $2, completed = $3 WHERE id = $4",
      [task.title, task.details, task.completed, id]
    );
    if (updateTask.rowCount !== 0) {
      res.json({ status: 200, message: "The task is updated" });
    } else {
      res.json({ status: 404, message: "The task does not exist" });
    }
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
});

// Delete a todo task
app.delete("/api/v1/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pgClient.query("DELETE FROM tasks WHERE id = $1", [
      id,
    ]);
    if (deleteTask.rowCount !== 0) {
      res.json({ status: 200, message: "The task is deleted" });
    } else {
      res.json({ status: 404, message: "The task does not exist" });
    }
  } catch (err) {
    res.json({ status: 500, message: err.message });
  }
});

// Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
