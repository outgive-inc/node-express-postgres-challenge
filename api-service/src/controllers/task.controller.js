const TaskRepository = require('../repository/task.repository')
const BaseController = require('./base.controller')


class TaskController extends BaseController {
    repo
    constructor(){
        super()
        this.repo = TaskRepository
    }
}

module.exports = new TaskController()