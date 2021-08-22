require('dotenv').config()

const express = require('express')
// const http = require('http')
// const bodyParser = require('body-parser')
const cors = require('cors')
const { TasksRoutes, SubTasksRoutes } = require('./routes')

// * App initialization
const app = express()
app.use(cors())
app.use(express.json())

// * Healthcheck
app.use(`/health-check`, (req, res) =>
  res.json({
    success: true,
    message: `${process.env.NODE_ENV} server is running healthy`,
  })
);

// * Routes
app.use('/api/tasks', TasksRoutes)
app.use('/api/sub-tasks', SubTasksRoutes)

// * Server
const port = process.env.PORT || 5000

app.listen(port, async () => {
  console.log(
    `🚀 ${process.env.NODE_ENV} server ready at: http://localhost:${port}`
  )
})
