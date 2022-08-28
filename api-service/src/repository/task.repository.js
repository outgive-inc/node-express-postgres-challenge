// task.repository.js
const subTaskModel = require('../models/subTask.model');
const TaskModel = require('../models/task.model');
const BaseRepository = require('./base.repository');

class TaskRepository extends BaseRepository{
  model;
  constructor(){
    super();
    this.model = TaskModel;
    this.model.relations = ["sub_tasks"]
  }
}

module.exports = new TaskRepository();