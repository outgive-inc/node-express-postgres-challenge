import { Model } from "objection";

export class Tasks extends Model {
    static get tableName() {
        return "tasks";
    }

    taskId!: string;
    title!: string;
    details!: string;
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