const BaseModel = require("./base.model");

class SubTask extends BaseModel{
    table
    constructor(){
        super()
        this.table = "sub_tasks"
        this.primary_key = "subTaskid"
    }

    fillables = [
        "subTaskid",
        "task_id",
        "title",
        "completed"
    ]

    // rules = {
    //     "fname" : "required|max:40|",
    //     "age" : "required"
    // }
}

module.exports = new SubTask()