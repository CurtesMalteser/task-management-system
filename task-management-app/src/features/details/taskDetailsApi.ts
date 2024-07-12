import { Task } from "task-management-lib/lib/task";
import URL from '../../constants/url';
import { isTask } from "../../utils/task";

export async function fetchTask(id: string): Promise<Task> {
  return fetch(URL.TASK_BY_ID.trim().replace(':id', id))
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

export async function updateTask(task: Task): Promise<Task> {
  return fetch(URL.TASK_BY_ID.trim().replace(':id', task.id), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  })
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