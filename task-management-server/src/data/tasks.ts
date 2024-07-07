import {
    Priority,
    Status,
    Task,
    Tasks,
} from '../../../lib/src/task';

const tasks: { [key: string]: Task } = {
    1: {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        dueDate: 1632900000000,
        creationDate: 1632900000000,
        priority: Priority.LOW,
        status: Status.OPEN,
    },
    2: {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        dueDate: 1632900000000,
        creationDate: 1632900000000,
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
    },
    3: {
        id: '3',
        title: 'Task 3',
        description: 'Description 3',
        dueDate: 1632900000000,
        creationDate: 1632900000000,
        priority: Priority.HIGH,
        status: Status.COMPLETED,
    },
    4: {
        id: '4',
        title: 'Task 4',
        description: 'Description 4',
        dueDate: 1632900000000,
        creationDate: 1632900000000,
         priority: Priority.HIGH,
        status: Status.IN_PROGRESS,
    },
    5: {
        id: '5',
        title: 'Task 5',
        description: 'Description 5',
        dueDate: 1632900000000,
        creationDate: 1632900000000,
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
    },
    6: {
        id: '6',
        title: 'Task 6',
        description: 'Description 6',
        dueDate: 1632900000000,
        creationDate: 1632900000000,
        priority: Priority.HIGH,
        status: Status.COMPLETED,
    },
}

export function getTasks(): Tasks {
    return {
        tasks: Object.values(tasks)
    }
}

export function getTask(id: string): Task {
    return tasks[id];
}

export function addTask(taskData: Omit<Task, 'id' | 'status' | 'creationDate'>): Task {

    const id = (Object.keys(tasks).length + 1).toString();

    const newTask: Task = {
        id: id,
        status: Status.OPEN,
        creationDate: Date.now(),
        ...taskData,
    }

    tasks[id] = newTask;

    return newTask;
}

export function updateTask(id: string, taskData: Omit<Task, 'id' | 'creationDate'>): Task | null {

    if (tasks.hasOwnProperty(id)) {

        const updatedTask: Task = {
            id: id,
            creationDate: tasks[id].creationDate,
            ...taskData,
        }

        tasks[id] = updatedTask;

        return updatedTask;
    } else {
        return null;
    }
}

export function deleteTask(id: string): boolean {
    if (tasks.hasOwnProperty(id)) {
        delete tasks[id];
        return true;
    } else {
        return false;
    }
}