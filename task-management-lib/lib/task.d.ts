export interface Task {
    id: string;
    title: string;
    description: string;
    dueDate: number;
    priority: 'low' | 'medium' | 'high';
    status: 'open' | 'in-progress' | 'completed';
}
export interface Tasks {
    tasks: Task[];
}
