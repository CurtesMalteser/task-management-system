import express from 'express';
import {
    Tasks,
    Task,
} from 'task-management-lib/src/task';
import {
    getTasks,
    getTask,
    addTask,
    updateTask,
    deleteTask,
} from '../data/tasks';

const routes = express.Router();

// Define a route handler for the purpose of checking if the API is running
routes.get('/', (_req, res) => {
    res.send('API is running');
});

routes.get('/tasks', (_req, res) => {
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

    const storedTask: Task | null = updateTask(id, putTask);

    if (storedTask !== null) {
        res.status(201).json(storedTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }

});

routes.delete('/task/:id', (req, res) => {
    const { id } = req.params;

    const taskDeleted = deleteTask(id);

    if (taskDeleted) {
        res.status(204).send()
    } else {
        res.status(404).json({ message: 'Task not found' });
    }

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