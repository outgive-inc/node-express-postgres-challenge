require('dotenv').config();

// Express App Setup
const express = require('express');
const { validationResult } = require('express-validator');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');

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

// TODO: Create initial DB table called task

function executeCreate () {
    pgClient.query(
    `
        CREATE TABLE IF NOT EXISTS task(
        id uuid, 
        title TEXT NOT NULL, 
        details TEXT, 
        completed BOOLEAN DEFAULT false, 
        PRIMARY KEY (id))
    `).catch((err) => console.log(err));
}
executeCreate();
// Express route handlers

// Get all to do list tasks
app.get('/api/v1/get/tasks', async (req, res) => {
  const text = `SELECT * FROM task`
  const data = await pgClient.query(text)
  res.send(data.rows)
  // TODO: Insert your route logic here
});

// Get a single todo task
app.get('/api/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here
  const id = [req.params.id]
  const query = `SELECT * FROM task WHERE id = $1`
  await pgClient.query(query,id,(err,sqlres)=>{
    if(err){
        res.send(err)
    }else{
        res.send({id:id,response:200})
    }
  })
});

// Create a todo task
app.post('/api/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here
  const errors = validationResult(req);
  if(errors.isEmpty){
    const id = uuid();
    const {title,details,complete} = req.body
    const data = [id, title, details, complete]
    const query = `INSERT INTO task (id,title,details,completed) VALUES ($1, $2, $3, $4)`
    await pgClient.query(query,data,(err,sqlres)=>{
        if(err){
            res.send(err)
        }else{
            res.send({id:id,response:200})
        }
    })
  }else{
    res.status(400).json({ errors: errors.array() });
  }
});

// Update a todo task
app.put('/api/v1/tasks/:id', async (req, res) => {
  const error = validationResult(req)
    if(error.isEmpty){
        const {id, title, complete, details} = req.body;
        const data = [title,details,complete,id]
        const query = `UPDATE task SET title = $1, details = $2, completed = $3 WHERE id = $4`
        await pgClient.query(query,data,(error,sqlres)=>{
            if(error){
                res.send(error)
            }else{
                res.send({id:id,response:200})
            }
        })
    }
  console.log(req.body)
  // TODO: Insert your route logic here
});

// Delete a todo task route
app.delete('/api/v1/tasks/:id', async (req, res) => {
    const delid = [req.params.id]
    const query = `DELETE FROM task WHERE id = $1`
    await pgClient.query(query,delid,(error,sqlres)=>{
      if(error){
          console.log(sqlres)
        res.send(error)
      }else{
        console.log(sqlres)
          res.send({id:delid,response:200,message:sqlres})
      }
    })
  // TODO: Insert your route logic here
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
