const { check } = require('express-validator')

exports.createTask = [
    check('title').notEmpty().withMessage('Title is required!'),
    check('details')
]

exports.updateTask = this.createTask

exports.updateTaskStatus = [
    check('completed').isBoolean().notEmpty().withMessage('Completed status is required')
]