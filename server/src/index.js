require('dotenv').config();

// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const tasks = require("./data/tasks")

// Config
const config = require('./config');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());


// Postgres client
const { Pool } = require('pg');
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});

pgClient.on('error', () => console.log('Lost Postgres connection'));

pgClient
  .query(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      "id" uuid,
      "title" VARCHAR(100),
      "details" text,
      "completed" bool DEFAULT 'false',
      "created" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY ("id"));
      `
  )
  .catch((err) => console.log(err));

//Handle error responses
function handleError(res, errorCode, errorMsg, statusCode) {
  if (res) {
    res.status(statusCode).send({
      errorMessage: errorMsg,
      errorCode: errorCode,
      statusCode,
    })
  }
}

// Get all to do list tasks
app.get('/api/v1/tasks/getall', async (req, res) => {
  try {
    const dao = new tasks.TasksDAO();
    res.send(await dao.getAllTasks(pgClient));
  } catch (err) {
    handleError(res, 4029, "Failed fetching data", 500)
    console.log(err);
  }
});

// Get a single todo task
app.get('/api/v1/tasks/get/:id', async (req, res) => {
  try {
    const dao = new tasks.TasksDAO();
    res.send(await dao.getTask(pgClient, req.params.id));
  } catch (err) {
    handleError(res, 4029, err.toString(), 500)
    console.log(err);
  }
});

// Create a todo task
app.post('/api/v1/tasks/create', async (req, res) => {
  try {
    const dao = new tasks.TasksDAO();
    res.send(await dao.createTask(pgClient, req.body.title));
  } catch (err) {
    handleError(res, 4029, err.toString(), 500)
    console.log(err);
  }
});

// Update a todo task
app.put('/api/v1/tasks/update', async (req, res) => {
  try {
    const dao = new tasks.TasksDAO();
    res.send(await dao.editTask(pgClient, req.body));
  } catch (err) {
    handleError(res, 4029, err.toString(), 500)
    console.log(err);
  }
});

// Delete a todo task route
app.delete('/api/v1/tasks/delete/:id', async (req, res) => {
  try {
    const dao = new tasks.TasksDAO();
    res.send(await dao.deleteTask(pgClient, req.params.id));
  } catch (err) {
    handleError(res, 4029, "Failed deleting data", 500)
    console.log(err);
  }
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
