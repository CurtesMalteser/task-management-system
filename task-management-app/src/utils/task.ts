import { Task } from "task-management-lib/lib/task";

export function isTask(obj: any): obj is Task {

    const task = obj as Task;

    return ('id' in task && typeof task.id === 'string' &&
        'title' in task && typeof task.title === 'string' &&
        'description' in task && typeof task.description === 'string' &&
        'dueDate' in task && typeof task.dueDate === 'number' &&
        'priority' in task && typeof task.priority === 'string' &&
        'status' in task && typeof task.status === 'string'
    );

}