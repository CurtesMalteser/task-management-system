import { Tasks } from "../../../../lib/src/task";
import URL from '../../constants/url';

function isTasks(obj: any): obj is Tasks {
  if (!obj || typeof obj !== 'object' || !Array.isArray(obj.tasks)) {
    return false;
  }

  return obj.tasks.every((task: any) => {
    console.log("obj.tasks: ", task);
    return 'id' in task && typeof task.id === 'string' &&
      'title' in task && typeof task.title === 'string' &&
      'description' in task && typeof task.description === 'string' &&
      'dueDate' in task && typeof task.dueDate === 'number' &&
      'priority' in task && typeof task.priority === 'string' &&
      'status' in task && typeof task.status === 'string';
  });
}

export function fetchTasks(): Promise<Tasks> {
  return fetch(URL.TASKS)
    .then(response => response.json())
    .then(data => {
      if (isTasks(data)) {
        return data;
      } else {
        throw new Error('Invalid tasks data');
      }
    })
    .catch(error => {
      console.error(`There has been a problem with your fetch operation: ${error.message}`);
      throw error;
    });
}
