const SubTaskRepository = require('../repository/subTask.repository')
const BaseController = require('./base.controller')


class SubTaskController extends BaseController {
    repo
    constructor(){
        super()
        this.repo = SubTaskRepository
    }
}

module.exports = new SubTaskController()