const BaseModel = require("./base.model");
const subTaskModel = require("./subTask.model");

class Task extends BaseModel{
    table
    relations
    constructor(){
        super()
        this.table = "tasks"
        this.primary_key = "taskid"
    }

    fillables = [
        "taskId",
        "title",
        "details",
        "completed"
    ]

    // rules = {
    //     "fname" : "required|max:40|",
    //     "age" : "required"
    // }
}

module.exports = new Task()