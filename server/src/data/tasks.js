const uuid = require('uuid/v4');

class TasksDAO {
    async editTask(db, task) {

        if (task.title.length > 100) {
            throw new Error("Title cannot exceed 100 characters")
        } else if (task.title.length <= 0) {
            throw new Error("Title cannot be empty")
        }

        await db.query("UPDATE tasks SET title = $1, details = $2, completed = $3 WHERE id = $4", [task.title, task.details, task.completed, task.id]);
    }
    async deleteTask(db, id) {
        await db.query("DELETE FROM tasks WHERE id = $1", [id]);
    }
    async createTask(db, title) {

        if (title.length > 100) {
            throw new Error("Title cannot exceed 100 characters")
        } else if (title.length <= 0) {
            throw new Error("Title cannot be empty")
        }

        let task = {
            id: uuid(),
            title: title,
            details: "",
            completed: false,
        }

        await db.query("INSERT INTO tasks (id, title, details, completed) VALUES($1,$2,$3,$4)", [task.id, task.title, task.details, task.completed]);

        return task
    }
    async getAllTasks(db) {
        const res = await db.query("SELECT * FROM tasks ORDER BY completed ASC");
        return res.rows;
    }
    async getTask(db, id) {
        const res = await db.query("SELECT * FROM tasks WHERE id = $1", [id]);

        if (!res.rows[0]) {
            throw new Error(`No task was found: ${id}`)
        }

        return res.rows[0]
    }
}

module.exports = {
    TasksDAO
}