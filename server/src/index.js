require("dotenv").config();

// Express App Setup
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid/v4");

// Config
const config = require("./config");

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client
const { Pool } = require("pg");
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});
pgClient.on("error", () => console.log("Lost Postgres connection"));

// TODO: Create initial DB table called task
pgClient
  .query(
    `
     CREATE TABLE IF NOT EXISTS tasks (
      id uuid PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      details VARCHAR(255),
      completed BOOLEAN DEFAULT FALSE
      );
    `
  )
  .catch((err) => console.log(err));

// Express route handlers

// Get all to do list tasks
app.get("/api/v1/tasks", async (req, res) => {
  // TODO: Insert your route logic here
  const query = "SELECT * FROM tasks";
  try {
    const allTasks = await pgClient.query(query);
    res.json(allTasks.rows);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Get a single todo task
app.get("/api/v1/tasks/:id", async (req, res) => {
  // TODO: Insert your route logic here
  const { id } = req.params;
  const query = "SELECT * FROM tasks WHERE id = $1";
  try {
    const getTask = await pgClient.query(query, [id]);
    res.json(getTask.rows[0]);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

// Create a todo task
app.post("/api/v1/tasks", async (req, res) => {
  // TODO: Insert your route logic here
  const { title, details } = req.body;
  const query =
    "INSERT INTO tasks(id, title, details) VALUES($1, $2, $3) RETURNING *";
  try {
    const newTask = await pgClient.query(query, [uuid(), title, details]);
    res.status(201).json(newTask.rows[0]);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

// Update a todo task
app.put("/api/v1/tasks/:id", async (req, res) => {
  // TODO: Insert your route logic here
  const { id } = req.params;
  const { title, details, completed } = req.body;
  const query =
    "UPDATE tasks SET title=$1, details=$2, completed=$3 WHERE id=$4";
  try {
    await pgClient.query(query, [title, details, completed, id]);
    res.json({ msg: "Update Success!" });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

// Delete a todo task route

app.delete("/api/v1/tasks/:id", async (req, res) => {
  // TODO: Insert your route logic here
  const { id } = req.params;
  const query = "DELETE FROM tasks WHERE id=$1";
  try {
    await pgClient.query(query, [id]);
    res.json({ msg: "Task Deleted!" });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
