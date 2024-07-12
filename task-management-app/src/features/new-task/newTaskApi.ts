import {
    Task,
    TaskRequest,
} from "task-management-lib/lib/task";
import URL from '../../constants/url';
import { isTask } from '../../utils/task';

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