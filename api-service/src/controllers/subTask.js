const { Task, SubTask } = require('../models')
const { validationResult } = require('express-validator')
const { mapErrors } = require('../util/validation')

exports.getSubTasks = async (req, res) => {
    try {
        const subTasks = await SubTask.findAll({include: Task})

        if (!subTasks) res.status(400).send('No records found!')

        res.status(200).send(subTasks)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.createSubTask = async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) return res.status(400).send({errors: mapErrors(errors.array())})

        const { taskId } = req.body

        const task = await Task.findByPk(taskId)

        if (!task) return res.status(400).send({message: 'Task not found! Task ID is either wrong or does not exist!'})
        
        const newSubTask = await SubTask.create(req.body)

        res.status(201).send(newSubTask)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.updateSubTask = async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) return res.status(400).send({errors: mapErrors(errors.array())})

        const subTask = await SubTask.findByPk(req.params.subTaskId)

        if (!subTask) return res.status(400).send({message: "Sub-task does not exist!"})

        const updatedSubTask = await subTask.update(req.body)
        const { taskId } = updatedSubTask
        
        if ('completed' in req.body) {
            const { count: remainingSubTaskCount } = await SubTask.findAndCountAll({ where: { taskId, completed: false } })
            await Task.update({completed: remainingSubTaskCount === 0}, { where: {taskId}})
        }

        res.status(200).send(updatedSubTask)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.deleteSubTask = async (req, res) => {
    try {
        const subTask = await SubTask.findByPk(req.params.subTaskId)

        if (!subTask) return res.status(404).send({message: 'Sub-task does not exist'})

        await subTask.destroy()

        res.status(200).send({message: 'Sub-subTask deleted!'})
    } catch (error) {
        res.status(400).send(error)
    }
}