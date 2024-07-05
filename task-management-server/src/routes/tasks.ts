import express from 'express';
import {
    Tasks,
    Task,
} from '../../../lib/src/task';
import {
    getTasks,
    getTask,
    addTask,
} from '../data/tasks';

const routes = express.Router();

// Define a route handler for the default home page
routes.get('/', (req, res) => {
    res.send('API is running');
});

routes.get('/tasks', (req, res) => {
    const tasks: Tasks = getTasks();
    res.json(tasks);
});

routes.post('/task', (req, res) => {
    const taskData = req.body;
    const storedTask: Task = addTask(taskData);
    res.status(201).json(storedTask);

});

routes.put('/task/:id', (req, res) => {
    const { id } = req.params;

    const putTask = req.body;

    const storedTask: Task = {
        id: id,
        title: putTask.title,
        description: putTask.description,
        dueDate: putTask.dueDate,
        priority: putTask.priority,
        status: putTask.status
    }

    res.status(201).json(storedTask);

});

routes.delete('/task/:id', (req, res) => {
    const { id } = req.params;

    console.log(`Deleting task with id: ${id}`);

    res.status(204).send();

});

routes.get('/task/:id', (req, res) => {
    const { id } = req.params;

    const task = getTask(id);

    if (task) {
           res.status(200).json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }

});

export default routes;