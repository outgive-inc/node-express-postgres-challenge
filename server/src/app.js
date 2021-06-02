require("dotenv").config();
// Express App Setup
const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const newTaskRouter = require("./routes/new");
const allTasksRouter = require("./routes/index");
const singleTaskRouter = require("./routes/show");
const updateTaskRouter = require("./routes/update");
const deleteTaskRouter = require("./routes/delete");

// Initialization
const app = express();

app.use(cors());
app.use(express.json());
app.use(logger("dev"));

app.use(newTaskRouter);
app.use(allTasksRouter);
app.use(singleTaskRouter);
app.use(updateTaskRouter);
app.use(deleteTaskRouter);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

module.exports = app;
