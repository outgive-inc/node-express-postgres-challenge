const { check } = require('express-validator')

exports.updateSubTask = [
    check('title').notEmpty().withMessage('Title is required!')
]

exports.createSubTask = [
    check('taskId').notEmpty().withMessage('Task ID is required!'),
    ...this.updateSubTask
]

exports.updateSubTaskStatus = [
    check('completed').isBoolean().notEmpty().withMessage('Completed status is required')
]