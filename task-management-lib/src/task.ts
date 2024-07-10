// I'll need a TaskRequest interface to define the shape of the request body for creating a new task.
// This will be used in the POST request to the server without id, timestamp and status.
export enum Priority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high',
}

export enum Status {
    OPEN = 'open',
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
}

export interface TaskRequest {
    title: string;
    description: string;
    dueDate: number; // Unix timestamp
    priority: Priority;
}

export interface Task extends TaskRequest {
    id: string;
    creationDate: number; // Unix timestamp
    status: Status;
}

export interface Tasks {
    tasks: Task[];
}
