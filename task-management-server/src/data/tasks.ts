import {
    Priority,
    Status,
    Task,
    Tasks,
    TaskRequest,
} from "task-management-lib/lib/task";

const tasks: { [key: string]: Task } = {
    1: {
        id: '1',
        title: 'Task 1',
        description: 'Description 1',
        dueDate: 1723725000000,
        creationDate: 1720009800000,
        priority: Priority.LOW,
        status: Status.OPEN,
    },
    2: {
        id: '2',
        title: 'Task 2',
        description: 'Description 2',
        dueDate: 1723638600000,
        creationDate: 1720096200000,
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
    },
    3: {
        id: '3',
        title: 'Task 3',
        description: 'Description 3',
        dueDate: 1722515400000,
        creationDate: 1720269000000,
        priority: Priority.HIGH,
        status: Status.COMPLETED,
    },
    4: {
        id: '4',
        title: 'Task 4',
        description: 'Description 4',
        dueDate: 1721313000000,
        creationDate: 1720355400000,
         priority: Priority.HIGH,
        status: Status.IN_PROGRESS,
    },
    5: {
        id: '5',
        title: 'Task 5',
        description: 'Description 5',
        dueDate: 1721305800000,
        creationDate: 1720441800000,
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
    },
    6: {
        id: '6',
        title: 'Task 6',
        description: 'Description 6',
        dueDate: 1721727000000,
        creationDate: 1720429305524,
        priority: Priority.HIGH,
        status: Status.COMPLETED,
    },
}

export function getTasks(): Tasks {
    return {
        tasks: Object.values(tasks)
    }
}

export function getTask(id: string): Task {
    return tasks[id];
}

const isValidPriority =(value: any): value is Priority  =>  Object.values(Priority).includes(value);


export function validateTaskFields(task: TaskRequest) {
    const missingFields = [];
    if (!task.title) missingFields.push('title');
    if (!task.description) missingFields.push('description');
    if (typeof task.dueDate !== 'number') missingFields.push('dueDate');
    if (!isValidPriority(task.priority)) missingFields.push('priority');
  
    if (missingFields.length > 0) {
      return `Missing required fields: ${missingFields.join(', ')}`;
    }

    return null;
  }

  export function addTask(taskData: TaskRequest): Task {

    const id = (Object.keys(tasks).length + 1).toString();
    
    const newTask: Task = {
        ...taskData,
        id: id,
        status: Status.OPEN,
        creationDate: Date.now(),
    }

    tasks[id] = newTask;

    return newTask;
}

export function updateTask(id: string, taskData: Omit<Task, 'id' | 'creationDate'>): Task | null {

    if (tasks.hasOwnProperty(id)) {

        const updatedTask: Task = {
            id: id,
            creationDate: tasks[id].creationDate,
            ...taskData,
        }

        tasks[id] = updatedTask;

        return updatedTask;
    } else {
        return null;
    }
}

export function deleteTask(id: string): boolean {
    if (tasks.hasOwnProperty(id)) {
        delete tasks[id];
        return true;
    } else {
        return false;
    }
}