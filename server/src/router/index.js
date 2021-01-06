const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');
const { body, validationResult } = require('express-validator');

router.use(cors());
router.use(bodyParser.json());

// Config

const config = require('../config');

const { Pool } = require('pg')

const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
})

// TODO: Create initial DB table called task

// I'm not sure if it should really be 'task', I will used 'tasks'.

const createTasksTable = () => {
  const text = `
    CREATE TABLE IF NOT EXISTS tasks (
    id uuid, 
    title TEXT NOT NULL, 
    details TEXT, 
    completed BOOLEAN DEFAULT false, 
    PRIMARY KEY (id))
  `
  pgClient.query(text)
}

createTasksTable()

// Express route handlers

// Should be the only routes here('/').  But since there is no other versions, but v1. I will put all the routes here.

router.get('/', (req, res) => {
    res.send('Link to versions')
})

// Get all to do list tasks
router.get('/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here
  const text = `SELECT * FROM tasks`
  const tasks = await pgClient.query(text)
  res.send(tasks.rows)
});

// Get a single todo task
router.get('/v1/task', async (req, res) => {
  // TODO: Insert your route logic here
  const text = `SELECT * FROM tasks WHERE id = $1`
  const values = [req.query.id]
  await pgClient.query(text, values)
  .then(item => {
    res.send(item.rows[0])
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

// Create a todo task
router.post('/v1/task', 
  body('title').isLength({min: 2}), //validate
  body('completed').isBoolean(),  //validate
  async (req, res) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = uuid()
  const text = `INSERT INTO tasks (id, title, details, completed) VALUES ($1, $2, $3, $4)`
  const values = [id, req.body.title, req.body.details, req.body.completed]
  await pgClient.query(text, values)
  .then(() => {
    res.send({
      id: id,
      msg: `Created task id: ${id}`
    })
  })
  .catch(err => {
    res.status(400).json(err)
  })
});

// Update a todo task
router.put('/v1/task/:id', 
  body('title').isLength({min: 2}), //validate
  body('completed').isBoolean(),  //validate
  async (req, res) => {

  // TODO: Insert your route logic here
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = req.params.id
  const { title, details, completed} = req.body
  const text = `UPDATE tasks SET title = $1, details = $2, completed = $3 WHERE id = $4`
  const values = [title, details, completed, id]
  await pgClient.query(text, values)
  .then(() => {
      res.send(`Updated task id: ${id}`)
  })
  .catch(err => {
      res.status(400).json(err)
  })
});

// Delete a todo task route
router.delete('/v1/task/:id', async (req, res) => {
  // TODO: Insert your route logic here
  const id = req.params.id
  const text = `DELETE FROM tasks WHERE id = $1`
  const values = [id]
  await pgClient.query(text, values)
  .then(() => {
      res.send(`Deleted task id: ${id}`)
  })
  .catch(err => {
      res.status(400).json(err)
  })
});


module.exports = router