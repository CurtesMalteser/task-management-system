import express from 'express';
import {
    Tasks,
    Task,
} from '../../../../lib/src/task';

const routes = express.Router();

// Define a route handler for the default home page
routes.get('/', (req, res) => {
    res.send('API is running');
});

routes.get('/tasks', (req, res) => {
    const tasks: Tasks = {
        tasks: [
            {
                id: '1',
                title: 'Task 1',
                description: 'Description 1',
                dueDate: 1632900000000,
                priority: 'low',
                status: 'open'
            },
            {
                id: '2',
                title: 'Task 2',
                description: 'Description 2',
                dueDate: 1632900000000,
                priority: 'medium',
                status: 'in-progress'
            },
            {
                id: '3',
                title: 'Task 3',
                description: 'Description 3',
                dueDate: 1632900000000,
                priority: 'high',
                status: 'completed'
            },
            {
                id: '4',
                title: 'Task 4',
                description: 'Description 4',
                dueDate: 1632900000000,
                priority: 'high',
                status: 'in-progress'
            },
            {
                id: '5',
                title: 'Task 5',
                description: 'Description 5',
                dueDate: 1632900000000,
                priority: 'medium',
                status: 'in-progress'
            },
            {
                id: '6',
                title: 'Task 6',
                description: 'Description 6',
                dueDate: 1632900000000,
                priority: 'high',
                status: 'completed'
            }
        ]
    }

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

export default routes;