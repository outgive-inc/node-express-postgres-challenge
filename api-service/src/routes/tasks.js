const router = require('express').Router()
const { TaskController } = require('../controllers')
const { TaskValidation } = require('../util/validation')

router

// GET /api/tasks
.get('/', TaskController.getTasks)

// POST /api/tasks
.post('/', TaskValidation.createTask, TaskController.createTask)

// PATCH /api/tasks/:taskId
.patch('/:taskId', TaskValidation.updateTask, TaskController.updateTask)

// PATCH /api/tasks/:taskId/status
.patch('/:taskId/status', TaskValidation.updateTaskStatus, TaskController.updateTask)

// DELETE /api/tasks/:taskId
.delete('/:taskId', TaskController.deleteTask)

module.exports = router