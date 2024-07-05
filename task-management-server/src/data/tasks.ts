import {
    Task,
    Tasks,
} from '../../../lib/src/task';

const tasks: { [key: string]: Task } = {
    1: {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        dueDate: 1632900000000,
        priority: 'low',
        status: 'open'
    },
    2: {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        dueDate: 1632900000000,
        priority: 'medium',
        status: 'in-progress'
    },
    3: {
        id: '3',
        title: 'Task 3',
        description: 'Description 3',
        dueDate: 1632900000000,
        priority: 'high',
        status: 'completed'
    },
    4: {
        id: '4',
        title: 'Task 4',
        description: 'Description 4',
        dueDate: 1632900000000,
        priority: 'high',
        status: 'in-progress'
    },
    5: {
        id: '5',
        title: 'Task 5',
        description: 'Description 5',
        dueDate: 1632900000000,
        priority: 'medium',
        status: 'in-progress'
    },
    6: {
        id: '6',
        title: 'Task 6',
        description: 'Description 6',
        dueDate: 1632900000000,
        priority: 'high',
        status: 'completed'
    },
}

export function getTasks(): Tasks {
    return {
        tasks: Object.values(tasks)
    }
}