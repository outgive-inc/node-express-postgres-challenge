// task.repository.js
const SubTaskModel = require('../models/subTask.model');
const BaseRepository = require('./base.repository');

class SubTaskRepository extends BaseRepository{
  model;
  constructor(){
    super();
    this.model = SubTaskModel;
  }
}

module.exports = new SubTaskRepository();