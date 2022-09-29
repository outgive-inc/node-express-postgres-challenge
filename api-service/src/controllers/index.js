const getTasks = require('./tasks/get-tasks');
const createTask = require('./tasks/create-task');
const getTaskById = require('./tasks/get-task-by-id');
const updateTask = require('./tasks/update-task');
const deleteTask = require('./tasks/delete-task');
const toggleCompletedStatus = require('./tasks/toggle-completed-status');

const createSubTask = require('./sub-tasks/create-subtask');
const deleteSubTask = require('./sub-tasks/delete-subtask');
const toggleSubTaskStatus = require('./sub-tasks/toggle-subtask-status');

module.exports = {
    ...getTasks,
    ...createTask,
    ...getTaskById,
    ...updateTask,
    ...deleteTask,
    ...toggleCompletedStatus,

    ...createSubTask,
    ...deleteSubTask,
    ...toggleSubTaskStatus
}