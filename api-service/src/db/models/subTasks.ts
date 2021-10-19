import { Model } from "objection";

export class SubTasks extends Model {
    static get tableName() {
        return "subTasks";
    }

    subTaskId!: string;
    taskId!: string;
    title!: string;
    completed!: boolean;

    create_date!: string;
    update_date!: string;

    $beforeInsert(){
        this.create_date = new Date().toISOString();
        this.update_date = new Date().toISOString();
    }

    $beforeUpdate(){
        this.update_date = new Date().toISOString();
    }
}