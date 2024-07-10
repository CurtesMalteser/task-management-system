import {
    Task,
    TaskRequest,
} from "task-management-lib/lib/task";
import URL from '../../constants/url';

function isTask(obj: any): obj is Task {

    const task = obj as Task;

    return ('id' in task && typeof task.id === 'string' &&
        'title' in task && typeof task.title === 'string' &&
        'description' in task && typeof task.description === 'string' &&
        'dueDate' in task && typeof task.dueDate === 'number' &&
        'priority' in task && typeof task.priority === 'string' &&
        'status' in task && typeof task.status === 'string');

}

export async function postTask(TaskRequest: TaskRequest): Promise<Task> {

    const request = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(TaskRequest),
    };

    return fetch(URL.TASK, request)
        .then(response => response.json())
        .then(data => {
            if (isTask(data)) {
                return data;
            } else {
                throw new Error('Invalid task data');
            }
        })
        .catch(error => {
            console.error(`There has been a problem with your fetch operation: ${error.message}`);
            throw error;
        });
}