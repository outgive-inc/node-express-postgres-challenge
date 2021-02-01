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
const { Pool } = require("pg");
const pgClient = new Pool({
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
});
pgClient.on("error", () => console.log("Lost Postgres connection"));

pgClient
  .query(
    `
    CREATE TABLE IF NOT EXISTS tasks(
      id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
      title TEXT NOT NULL,
      details TEXT,
      completed BOOLEAN DEFAULT FALSE
   );
`
  )
  .catch((err) => console.log(err));

// Validations

const validationCheck = (request) => {
  if (request.title.length < 10 || request.details.length < 10) {
    return false;
  } else {
    return true;
  }
};

// Express route handlers
app.get("/test", (req, res) => {
  res.send("Yay It is Working!");
});

// Get all to do list tasks
app.get("/api/v1/tasks", async (req, res) => {
  const tasks = await pgClient.query("SELECT * FROM tasks");
  res.status(200).send(tasks.rows);
});

// Get a single todo task
app.get("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;

  const task = await pgClient.query("SELECT * FROM tasks WHERE id = $1", [id]).catch((e) => {
    res.status(500).send(`Encountered an internal error when fetching task with ID ${id}`);
  });

  res.status(200).send(task.rows);
});

// Create a todo task
app.post("/api/v1/tasks", async (req, res) => {
  const { title, details, completed } = req.body;
  const id = uuid();
  const validation = await validationCheck(req.body);

  if (validation) {
    const task = await pgClient
      .query(
        `INSERT INTO tasks( title, details, completed) VALUES 
    ($1, $2, $3)`,
        [title, details, completed]
      )
      .catch((e) => {
        res.status(500).send("Encountered an internal error when creating an task");
      });
    res.status(201).send(`Task created with ID: ${id}`);
  } else {
    res.status(400).json({ error: "Title and Details must be more than 10 characters" }).end();
  }
});

// Update a todo task
app.put("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const { title, details, completed } = req.body;

  const validation = await validationCheck(req.body);

  if (validation) {
    await pgClient
      .query(
        `
    UPDATE tasks SET title = $1, details = $2, completed = $3 WHERE id = $4
  `,
        [title, details, completed || false, id]
      )
      .catch((e) => {
        res.status(500).send("Encountered an internal error when updating an task");
      });

    res.status(200).send(`Task updated with ID: ${id}`);
  } else {
    res.status(400).json({ error: "Title and Details must be more than 10 characters" }).end();
  }
});

// Delete a todo task
app.delete("/api/v1/tasks/:id", async (req, res) => {
  const id = req.params.id;

  await pgClient.query("DELETE FROM tasks WHERE id = $1", [id]).catch((e) => {
    res.status(500).send("Encountered an internal error when deleting an task");
  });

  res.status(200).send(`Task deleted with ID: ${id}`);
});

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
