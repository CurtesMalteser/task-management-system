// US#1: As a user, I want to create a new task with a title, description, due date, and
// priority level (low, medium, high) so that I can organize my work effectively.
// 2. US#2: As a user, I want to view a list of all my tasks, with options to sort by due
// US#2: As a user, I want to view a list of all my tasks, with options to sort by due date,
// priority, and creation date, so that I can prioritize my work.
// US#3: As a user, I want to edit a task’s details, including the ability to change its status
// to "in-progress" or "completed", so that I can keep my task information up-to-date.
// US#4: As a user, I want to delete a task so that I can remove tasks that are no longer
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