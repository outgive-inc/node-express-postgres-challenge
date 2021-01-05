require("dotenv").config();

// Express App Setup
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const DB = require("./db/DB");
const TaskController = require("./controller/TasksController");

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

DB.createTable();

// Express route handlers

// Get all to do list tasks
app.get("/api/v1/tasks", async (req, res) => {
	// TODO: Insert your route logic here
	const data = await TaskController.getTasks(req.query);
	res.send(data);
});

// Get a single todo task
app.get("/api/v1/task", async (req, res) => {
	// TODO: Insert your route logic here
	const data = await TaskController.getTask(req.query);
	res.send(data);
});

// Create a todo task
app.post("/api/v1/tasks", async (req, res) => {
	// TODO: Insert your route logic here
	const data = await TaskController.createTask(req.body);
	res.send(data);
});

// Update a todo task
app.put("/api/v1/tasks/:id", async (req, res) => {
	// TODO: Insert your route logic here
	const data = await TaskController.updateTask(req.params.id, req.body);
	res.send(data);
});

// Delete a todo task route

app.delete("/api/v1/tasks/:id", async (req, res) => {
	// TODO: Insert your route logic here
	const data = await TaskController.deleteTask(req.params.id);
	res.send(data);
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
