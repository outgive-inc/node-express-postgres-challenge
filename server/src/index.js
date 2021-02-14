require("dotenv").config();

// Express App Setup
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuid = require("uuid/v4");
const queries = require("./queries");

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
pgClient.query(queries.createTasksTable).catch((err) => console.log(err));

// Express route handlers

// Get all to do list tasks
app.get("/api/v1/tasks", async (req, res) => {
  pgClient.query("SELECT ID,title,completed FROM tasks", (err, results) => {
    if (err) {
      console.log(err);
      res.status(200).json({ data: results.rows, status: 500 });
    } else {
      res.status(200).json({ data: results.rows, status: 200 });
    }
  });
});

// Get a single todo task
app.get("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;
  if (!!id) {
    pgClient.query(queries.getTask, [id], (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.status(201).json({ data: results.rows, status: 200 });
      }
    });
  } else {
    res.status(200).json({ status: 500 });
  }
});

// Create a todo task
app.post("/api/v1/tasks", async (req, res) => {
  const { title, details } = req.body;
  if (!!title && !!details) {
    pgClient.query(
      queries.createTask,
      [uuid(), title, details],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(201).json({ status: 500 });
        } else {
          res.status(201).json({ data: results.rows, status: 200 });
        }
      }
    );
  } else {
    res.status(201).json({ status: 500 });
  }
});

// Update a todo task
app.put("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;
  if (!!id && !!req.body) {
    pgClient.query(
      queries.updateTask,
      [req.body.title, req.body.details, req.body.completed, id],
      (err, results) => {
        if (err) {
          console.log(err);
          res.status(201).json({ status: 500 });
        } else {
          res.status(201).json({ status: 200 });
        }
      }
    );
  } else {
    res.status(201).json({ status: 500 });
  }
});

// Delete a todo task route

app.delete("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;
  if (!!id) {
    pgClient.query(queries.deleteTask, [id], (err, results) => {
      if (err) {
        console.log(err);
        res.status(201).json({ status: 500 });
      } else {
        res.status(201).json({ status: 200 });
      }
    });
  } else {
    res.status(201).json({ status: 500 });
  }
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
