const { Task, SubTask } = require('../models')
const { validationResult } = require('express-validator')
const { mapErrors } = require('../util/validation')

exports.getTasks = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query

        const offset = page === 1 ? 0 : ((page - 1) * limit)

        const { count, rows: tasks} = await Task.findAndCountAll({
            offset,
            limit: limit,
            include: [{ model: SubTask, as: 'SubTasks' }],
            order: [ 
                ['createdAt', 'DESC'],
                [ { model: SubTask, as: 'SubTasks' }, 'createdAt', 'DESC' ]
            ],
        })

        if (!tasks) res.status(400).send('No records found!')
        
        res.status(200).send({
            tasks,
            page: parseInt(page),
            totalPage: Math.ceil(count / limit)
        })
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.createTask = async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) return res.status(400).send({errors: mapErrors(errors.array())})

        const newTask = await Task.create(req.body)

        res.status(201).send(newTask)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.updateTask = async (req, res) => {
    try {
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) return res.status(400).send({errors: mapErrors(errors.array())})
        
        const task = await Task.findByPk(req.params.taskId)

        if (!task) return res.status(404).send({message: 'Task does not exist!'})

        const updatedTask = await task.update(req.body)
        const { taskId, completed } = updatedTask
        
        if ('completed' in req.body) {
            await SubTask.update({ completed }, { where: { taskId } })
        }

        res.status(200).send(updatedTask)
    } catch (error) {
        res.status(400).send(error)
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.taskId)

        if (!task) return res.status(404).send({message: 'Task does not exist'})

        await task.destroy()

        res.status(200).send({message: 'Task deleted!'})    
    } catch (error) {
        res.status(400).send(error)
    }
}