require('dotenv').config();

// Express App Setup
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');
const Joi = require('joi');
const _ = require('lodash');
const validate = require('uuid-validate');

// Config
const config = require('./config');

// Initialization
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(
  express.urlencoded({
    extended: true
  })
)
// Postgres client
const { Pool } = require('pg');
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort
});
pgClient.on('connect', () => console.log('Connection Success'));
pgClient.on('error', () => console.log('Lost Postgres connection'));

// TODO: Create initial DB table called task
pgClient.query(
  `
    CREATE TABLE IF NOT EXISTS tasks (
      id UUID PRIMARY KEY,
      title TEXT,
      details TEXT,
      completed BOOLEAN DEFAULT false
    );
  `
) 
.then(() => console.log("Create Table Success"))
.catch((err) => console.log(err));


// Express route handlers

// Get all to do list tasks
app.get('/api/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here
  try {
    let queryString =  "SELECT * FROM tasks";

    if(!_.isEmpty(req.query) && _.has(req.query, "id")) {
      queryString += ` where `;
    }

    if(_.has(req.query, "id")){
      if(validate(req.query.id)) {
        queryString += `id = '${req.query.id}'`
      } else {
        throw Error("Invalid format")
      }
    }

    if(_.has(req.query, "limit")){
      queryString += ` LIMIT ${req.query.limit} `
    }

    if(_.has(req.query, "page")){
      queryString += ` OFFSET ${req.query.page} `
    }

   
    queryString += ';'; 
    console.log(queryString);

    const list = await pgClient.query(queryString);
    const count = await pgClient.query("SELECT COUNT(*) FROM tasks");

    res.status(200).json({
      status: "success",
      data: {
        data: list.rows,
        count: parseInt(count.rows[0].count)
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.message,
    });
  }

});

// Create a todo task
app.post('/api/v1/tasks', async (req, res) => {
  // TODO: Insert your route logic here
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    details: Joi.string().min(3).required(),
  });

  try {
    await schema.validateAsync(req.body);

    const insertString = `INSERT INTO tasks (id, title, details, completed) VALUES ('${uuid()}', '${req.body.title}', '${req.body.details}', ${false}) RETURNING *`
    const count = await pgClient.query("SELECT COUNT(*) FROM tasks");
    const result = await pgClient.query(insertString);

    res.status(200).json({
      status: "success",
      data: result.rows[0],
      data: { data: result.rows[0], count: parseInt(count.rows[0].count) }
    });

  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.message,
    });
  }
});

// Update a todo task
app.put('/api/v1/tasks/:id', async (req, res) => {
  // TODO: Insert your route logic here

  const bodySchema = Joi.object({
    title: Joi.string().min(3).required(),
    details: Joi.string().min(3).required(),
    completed: Joi.boolean().required(),
  });

  const paramsSchema = Joi.object({
    id: Joi.string().min(3).required().uuid()
  });

  try {
    await bodySchema.validateAsync(req.body);
    await paramsSchema.validateAsync(req.params);

    const updateString = `UPDATE tasks SET title = '${req.body.title}', details = '${req.body.details}', completed = ${req.body.completed} WHERE id = '${req.params.id}' RETURNING *;`;
    console.log(updateString);
    const result = await pgClient.query(updateString);
    const count = await pgClient.query("SELECT COUNT(*) FROM tasks");

    res.status(200).json({
      status: "success",
      data: { count: parseInt(count.rows[0].count), data: result.rows[0] }
    });

  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.message,
    });
  }

});

// Delete a todo task route

app.delete('/api/v1/tasks/:id', async (req, res) => {
  // TODO: Insert your route logic here
  const paramsSchema = Joi.object({
    id: Joi.string().min(3).uuid().required()
  });

  try {
    await paramsSchema.validateAsync(req.params);

    const deleteString = `DELETE FROM tasks WHERE id = '${req.params.id}';`;
    await pgClient.query(deleteString);
    const count = await pgClient.query("SELECT COUNT(*) FROM tasks");


    res.status(200).json({
      status: "success",
      data: { count: parseInt(count.rows[0].count) }
    });

  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.message,
    });
  }
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
