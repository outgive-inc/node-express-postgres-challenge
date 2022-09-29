const controllers = require('./controllers');

module.exports = (app) => {
    app.get(`/`, (req, res) => {
        return res.json({
            success: true,
            message: `${process.env.NODE_ENV} server is running healthy`,
        })
    });

    app.get('/tasks', controllers.getTasks);
    app.post('/create-task', controllers.createTask);
    app.get('/task/:id', controllers.getTaskById);
    app.put('/update-task', controllers.updateTask);
    app.delete('/delete-task/:id', controllers.deleteTask);
    app.get('/toggle-completed-status/:id', controllers.toggleCompletedStatus);

    app.post('/create-subtask/:id', controllers.createSubTask);
    app.delete('/delete-subtask/:id', controllers.deleteSubTask);
    app.get('/toggle-subtask-status/:id', controllers.toggleSubTaskStatus);
}