require('dotenv').config();

// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

// Config
// const config = require('./config');
const config = require('./config/index.js');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres client
const { Pool } = require('pg');
// const pgClient = new Pool({
//   user: config.pgUser,
//   host: config.pgHost,
//   database: config.pgDatabase,
//   password: config.pgPassword,
//   port: config.pgPort,
// });
const pgClient = new Pool(config)
pgClient.on('error', () => console.log('Lost Postgres connection'));

pgClient.query(`
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  CREATE TABLE IF NOT EXISTS tasks (
    id uuid PRIMARY KEY,
    title TEXT NOT NULL,
    details TEXT NOT NULL,
    completed BOOlEAN DEFAULT false,
    active BOOLEAN DEFAULT true
  );
  `)
.catch((err) => console.log(err));


// Express route handlers

// Get all to do list tasks
app.get('/api/v1/tasks', async (req, res) => {
  const getAllTasks = (db) => {
    return db.query(`
      SELECT id, title, details, completed
      FROM tasks
      WHERE active = true
    ;`)
    .then(response => response.rows)
    .catch(err => err);
  };

  getAllTasks(pgClient)
  .then(response => res.json(response))
  .catch(err => res.json(err));
});

// Get a single todo task
app.get('/api/v1/tasks', async (req, res) => {
  const getTaskById = (db, id) => {
    return db.query(`
      SELECT *
      FROM tasks
      WHERE id = $1 AND active = true
    ;`, [id])
    .then(response => response.rows[0])
    .catch(err => err);
  };

  getTaskById(pgClient, id)
  .then(response => res.json(response))
  .catch(err => res.json(err));
});

// Create a todo task
app.post('/api/v1/tasks', async (req, res) => {
  const createTask = (db, taskId, title, details, completed) => {
    return db.query(`
    INSERT INTO tasks (id, title, details, completed)
    VALUES ($1, $2, $3, $4)
    RETURNING id, title, details, completed
    ;`, [taskId, title, details, completed])
    .then(response => response.rows[0])
    .catch(err => err);
  };

  const taskId = uuidv4();
  const { title, details, completed } = req.body;
  createTask(pgClient, taskId, title, details, completed)
  .then(response => res.json(response))
  .catch(err => res.json(err));
});

// Update a todo task
app.put('/api/v1/tasks/:id', async (req, res) => {
  const updateTask = (db, title, details, completed, taskId) => {
    return db.query(`
    UPDATE tasks
    SET title = $1, details = $2, completed = $3
    WHERE id = $4
    RETURNING id, title, details, completed
    ;`, [title, details, completed, taskId])
    .then(response => response.rows[0])
    .catch(err => err);
  };

  const { title, details, completed, taskId } = req.body;
  updateTask(pgClient, title, details, completed, taskId)
  .then(response => res.json(response))
  .catch(err => res.json(err)); 
});

// Delete a todo task route
app.delete('/api/v1/tasks/:id', async (req, res) => {
  const deleteTask = (db, taskId) => {
    return db.query(`
    UPDATE tasks
    SET active = false
    WHERE id = $1
    RETURNING *
    ;`, [taskId])
    .then(response => response.rows[0])
    .catch(err => err);
  };

  deleteTask(pgClient, req.params.id)
  .then(response => res.json(response))
  .catch(err => res.json(err)); 
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
