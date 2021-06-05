require('dotenv').config();

// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');
require('dotenv').config()
// Config
const config = require('./config');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client
const { Pool, Client } = require('pg');
const pgClient = new Client({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});
pgClient.connect().then(() => console.log('connected')).catch(err => console.error('connection error', err.stack))

// TODO: Create initial DB table called task

pgClient.query(`CREATE TABLE IF NOT EXISTS tasks (id serial PRIMARY KEY,title VARCHAR(50) NOT NULL,details VARCHAR(500) NOT NULL,completed BOOLEAN NOT NULL);`).catch((err) => console.log(err));

// Express route handlers

// Get all to do list tasks
app.get('/api/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here
  try {
    const fullList = await pgClient.query("SELECT * FROM tasks");
    res.json(fullList.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a single todo task
app.get('/api/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here

  try {
    const { id } = req.params;
    const todo = await pgClient.query("SELECT * FROM tasks WHERE todo_id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Create a todo task
app.post('/api/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here
  
  try {
    const { title , description} = req.body;
    
    const newTodo = await pgClient.query("INSERT INTO tasks (title,details,completed) VALUES($1,$2,$3) RETURNING *",[title , description || "", false]);
    
    res.json(newTodo.rows[0]);
  } catch (err) {
    
    console.error(err.message);
  }
});

// Update a todo task
app.put('/api/v1/tasks/:id', async (req, res) => {
  // TODO: Insert your route logic here

  try {
    const { id } = req.params;
    const { title , details , completed } = req.body;
    const updateTodo = await pgClient.query(
      "UPDATE tasks SET title = $2 , details = $3 , completed = $4 WHERE id = $1",
      [id , title , details , completed] 
    );

    const todo = await pgClient.query("SELECT * FROM tasks WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a todo task route

app.delete('/api/v1/tasks/:id', async (req, res) => {
  // TODO: Insert your route logic here

  try {
    const { id } = req.params;
    const deleteTodo = await pgClient.query("DELETE FROM tasks WHERE id = $1", [
      id
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }

});

// Server
const port = process.env.PORT || 4001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
