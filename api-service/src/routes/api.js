const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');
const subTaskController = require('../controllers/subTask.controller');


/* TASK API ROUTES */
router.get('/tasks', taskController.index);
router.post('/tasks', taskController.store);
router.get('/tasks/:id', taskController.show);
router.put('/tasks/:id', taskController.update);
router.delete('/tasks/:id', taskController.destroy);


/* SUB TASK API ROUTES */
router.get('/sub-tasks', subTaskController.index);
router.post('/sub-tasks', subTaskController.store);
router.get('/sub-tasks/:id', subTaskController.show);
router.put('/sub-tasks/:id', subTaskController.update);
router.delete('/sub-tasks/:id', subTaskController.destroy);



module.exports = router