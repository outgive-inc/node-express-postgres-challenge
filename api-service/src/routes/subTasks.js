const router = require('express').Router()
const { SubTaskController } = require('../controllers')
const { SubTaskValidation } = require('../util/validation')

router

// GET /api/sub-tasks
.get('/', SubTaskController.getSubTasks)

// POST /api/sub-tasks
.post('/', SubTaskValidation.createSubTask, SubTaskController.createSubTask)

// PATCH /api/sub-tasks/:subTaskId
.patch('/:subTaskId', SubTaskValidation.updateSubTask, SubTaskController.updateSubTask)

// PATCH /api/sub-tasks/:subTaskId/status
.patch('/:subTaskId/status', SubTaskValidation.updateSubTaskStatus, SubTaskController.updateSubTask)

// DELETE /api/sub-tasks/:subTaskId
.delete('/:subTaskId', SubTaskController.deleteSubTask)

module.exports = router