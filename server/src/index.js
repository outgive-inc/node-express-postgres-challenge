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
app.use(express.json());

// Postgres client
const { Pool } = require("pg");
const { release } = require("os");
const pgClient = new Pool({
    user: config.pgUser,
    host: config.pgHost,
    database: config.pgDatabase,
    password: config.pgPassword,
    port: config.pgPort,
});

pgClient.connect();

pgClient.on("error", (err, client) =>
    console.log("Lost Postgres connection", err)
);

pgClient.on("connect", (client) => {
    console.log("connected");
});

// TODO: Create initial DB table called task
pgClient.query(
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
     CREATE TABLE IF NOT EXISTS tasks(
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title VARCHAR(40) NOT NULL,
     details VARCHAR(50),
      completed BOOLEAN DEFAULT false
    );`,
    (err, res) => {
        if (err) {
            console.log("error", err);
        } else {
            console.log(res);
        }
    }
);

// Express route handlers

// Get all to do list tasks
app.get("/api/v1/tasks", async (req, res) => {
    // TODO: Insert your route logic here
    try {
        const tasks = await pgClient.query("SELECT * FROM tasks");
        res.json(tasks.rows);
    } catch (err) {
        res.json({ status: 500, message: err });
    }
});

// Get a single todo task
app.get("/api/v1/task", async (req, res) => {
    // TODO: Insert your route logic here
    try {
        const tasks = await pgClient.query("SELECT * FROM tasks LIMIT 1");
        res.json(tasks.rows);
    } catch (err) {
        res.json({ status: 500, message: err });
    }
});

// Create a todo task
app.post("/api/v1/tasks", async (req, res) => {
    // TODO: Insert your route logic here
    try {
        const tasks = req.body;
        const newTask = await pgClient.query(
            "INSERT INTO tasks(title, details) VALUEs($1, $2) RETURNING *",
            [tasks.title, tasks.details]
        );
        res.json(newTask.rows[0]);
    } catch (err) {
        res.json({ status: 500, message: err });
    }
});

// Update a todo task
app.put("/api/v1/tasks/:id", async (req, res) => {
    // TODO: Insert your route logic here
    try {
        const { id } = req.params;
        const { title, details, completed } = req.body;
        console.log(req.body);
        const updateTask = await pgClient.query(
            "UPDATE tasks SET title = $1, details = $2, completed = $3 WHERE id = $4",
            [title, details, completed, id]
        );
        if (updateTask) {
            res.status(200).json({ message: "Task Updated" });
        }
    } catch (err) {
        res.status(500).json({
            message: "something went wrong while updating the task",
        });
        console.log(err);
    }
});

// Delete a todo task route

app.delete("/api/v1/tasks/:id", async (req, res) => {
    // TODO: Insert your route logic here
    try {
        const { id } = req.params;
        const deleteTask = await pgClient.query(
            "DELETE FROM tasks WHERE id = $1",
            [id]
        );
        res.json(deleteTask);
    } catch (err) {
        res.json({ status: 500, message: err });
    }
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
