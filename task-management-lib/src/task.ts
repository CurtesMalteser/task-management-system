// I'll need a TaskRequest interface to define the shape of the request body for creating a new task.
// This will be used in the POST request to the server without id, timestamp and status.
export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

// Delete and wait to update the release when TaskRequest is added
export const priorityOrder: { [key in Priority]: number } = {
    [Priority.HIGH]: 3,
    [Priority.MEDIUM]: 2,
    [Priority.LOW]: 1,
};

export enum Status {
    OPEN = 'open',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: number; // Unix timestamp
    creationDate: number; // Unix timestamp
    priority: Priority;
    status: Status;
}

export interface Tasks {
    tasks: Task[];
}
