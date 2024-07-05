import express from 'express';
import {
    Tasks,
    Task,
} from '../../../lib/src/task';
import {
    getTasks,
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
    const newTask = req.body;

    const storedTask: Task = {
        id: '7',
        title: newTask.title,
        description: newTask.description,
        dueDate: newTask.dueDate,
        priority: newTask.priority,
        status: 'open'
    }

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

export default routes;