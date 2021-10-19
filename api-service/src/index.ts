require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import knex from "./db/knex";
import { Model } from "objection";
import tasks from "./routes/tasks";
import subTasks from "./routes/subTasks"

Model.knex(knex);

const app = express();

const port = process.env.PORT || 5000;

app
  .use(cors())
  .use(json())
  .use(urlencoded({ extended: true }));

app.listen(port, async () => {
  console.log(
    `🚀 ${process.env.NODE_ENV} server ready at: http://localhost:${port}`
  );
});

app.use("/api/tasks", tasks);
app.use("/api/subtasks", subTasks);

export default app;