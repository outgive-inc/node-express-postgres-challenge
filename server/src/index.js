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
const { Pool, Client } = require("pg");
const pgClient = new Pool({
  user: config.pgUser,
  host: "localhost",
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
			title varchar NOT NULL,
			details varchar,
			completed boolean DEFAULT FALSE
		);
    `
  )
  .catch((err) => console.log(err));

// Express route handlers

// Get all to do list tasks
app.get("/api/v1/tasks", async (req, res) => {
  // TODO: Insert your route logic her
  let query = "SELECT * FROM tasks";

  try {
    let response = await pgClient.query(query);
    console.log({ response });
    res.send({ data: response.rows });
  } catch (err) {
    res.send({
      data: {
        error: true,
        message: "Query failed!",
      },
    });
  }
});

// Get a single todo task
app.get("/api/v1/tasks/:id", async (req, res) => {
  // TODO: Insert your route logic here

  let id = req.params["id"];

  if (!id) {
    res.send({
      data: {
        error: true,
        message: "Invalid ID! Task ID dont exist!",
      },
    });
  }

  let query = "SELECT * FROM tasks WHERE id=($1)";
  let values = [id];

  try {
    let response = await pgClient.query(query, values);

    res.status(200).send({
      data: response.rows[0],
    });
  } catch (err) {
    console.log(err.stack);
    res.status(400).send({
      data: {
        error: true,
        message: "Invalid query.",
      },
    });
  }
});

// Create a todo task
app.post("/api/v1/tasks", async (req, res) => {
  // TODO: Insert your route logic here
  const query =
    "INSERT INTO tasks(id, title, details) VALUES($1, $2, $3) RETURNING *";
  const values = [uuid(), req.body["title"], req.body["details"]];
  try {
    const response = await pgClient.query(query, values);
    res.status(200);
    res.send({ data: response.rows[0] });
  } catch (err) {
    console.log(err.stack);
    res.status(400).send({
      data: {
        error: true,
        message: "Query failed!",
      },
    });
  }
});

// Update a todo task
app.put("/api/v1/tasks/:id", async (req, res) => {
  // TODO: Insert your route logic here
  console.log(req.body);
  if (req.body["title"] === "") {
    res.status(400).send({
      data: {
        error: true,
        message: `Invalid query! Title field is required!`,
      },
    });
  }
  if (req.params["id"] === null) {
    res.status(400).send({
      data: {
        error: true,
        message: "Invalid ID! Task ID dont exist!",
      },
    });
  }

  let query = `UPDATE tasks SET title=COALESCE($1,title),details=COALESCE($2, details),completed=COALESCE($3, completed) WHERE id=($4) RETURNING *`;
  let values = [
    req.body["title"],
    req.body["details"],
    req.body["completed"],
    req.params["id"],
  ];

  try {
    const response = await pgClient.query(query, values);
    res.status(200).send({ data: response.rows[0] });
  } catch (err) {
    console.log(err.stack);
    res.status(400).send({
      data: {
        error: true,
        message: "Invalid query.",
      },
    });
  }
});

// Delete a todo task route

app.delete("/api/v1/tasks/:id", async (req, res) => {
  // TODO: Insert your route logic here
  let id = req.params["id"];
  if (!id) {
    res.status(400).send({
      data: {
        error: true,
        message: "No Task ID.",
      },
    });
  }
  let query = "DELETE from tasks WHERE id=($1) RETURNING *";
  let values = [id];

  try {
    const response = await pgClient.query(query, values);
    res.status(200).send({ data: response.rows[0] });
  } catch (err) {
    res.status(400).send({
      data: {
        error: true,
        message: "Invalid query!",
      },
    });
  }
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
