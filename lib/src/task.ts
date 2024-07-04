// I'll need a TaskRequest interface to define the shape of the request body for creating a new task.
// This will be used in the POST request to the server without id, timestamp and status.
// If successful, the server will return the created task with the status, id and timestamp.
// Default status will be open and not part of the request body as already specified.
interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: number; // Unix timestamp
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'in-progress' | 'completed';
}

interface Tasks {
    tasks: Task[];
}

export { Task, Tasks };