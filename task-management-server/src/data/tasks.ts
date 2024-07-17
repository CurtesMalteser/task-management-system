import {
    Priority,
    Status,
    Task,
    Tasks,
    TaskRequest,
} from 'task-management-lib/lib/task';

 const tasks: { [key: string]: Task } = {
    1: {
        id: '1',
        title: 'Task 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        dueDate: 1723725000000,
        creationDate: 1720009800000,
        priority: Priority.LOW,
        status: Status.OPEN,
    },
    2: {
        id: '2',
        title: 'Task 2',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque gravida tristique augue id semper. In hac habitasse platea dictumst. Sed ultrices sapien vel nisi lacinia, vitae convallis mauris dictum. Ut finibus massa erat, ac egestas augue rutrum eu. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur efficitur bibendum leo, non congue eros ullamcorper sit amet. Aenean eget eros leo. Ut malesuada est in rutrum dignissim.',
        dueDate: 1723638600000,
        creationDate: 1720096200000,
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
    },
    3: {
        id: '3',
        title: 'Task 3',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae lectus et turpis sagittis feugiat ac in lorem. Cras mollis, nisl sit amet convallis pretium, urna leo efficitur nulla, et blandit lacus mauris cursus enim. Donec orci nunc, finibus nec leo ac, mattis elementum metus. Praesent non massa pharetra, imperdiet mi ac, faucibus arcu. Cras eleifend, tortor vitae maximus semper, tellus ipsum faucibus risus, in iaculis velit nibh sed magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse ac libero tellus. Nunc nec neque tincidunt, condimentum diam eget, pretium elit.',
        dueDate: 1722515400000,
        creationDate: 1720269000000,
        priority: Priority.HIGH,
        status: Status.COMPLETED,
    },
    4: {
        id: '4',
        title: 'Task 4',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla laoreet mattis sapien eu volutpat. Nam volutpat lorem et dolor euismod, id tincidunt augue ornare. Sed interdum ex enim, quis malesuada elit fermentum vel. Nulla facilisi. Etiam purus elit, semper id tincidunt nec, pretium sit amet neque. In tortor tortor, sollicitudin sit amet erat in, euismod commodo eros. Aenean sit amet diam vitae nulla fringilla pharetra id eu nulla. Nulla vestibulum odio tincidunt dui ultricies aliquam. Nam faucibus volutpat lectus, facilisis laoreet turpis tincidunt vel.',
        dueDate: 1721313000000,
        creationDate: 1720355400000,
        priority: Priority.HIGH,
        status: Status.IN_PROGRESS,
    },
    5: {
        id: '5',
        title: 'Task 5',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur accumsan eleifend dolor, non finibus nulla posuere non. Proin hendrerit arcu ac lectus vehicula viverra. Sed vulputate magna congue, venenatis ligula et, accumsan lectus. Vivamus aliquet odio sit amet aliquet varius. Ut porta diam quam, ac finibus orci interdum a. Proin viverra sapien a dolor convallis finibus. Cras urna lorem, eleifend eget vehicula non, consectetur vitae lectus. Mauris dignissim at lorem vitae eleifend. Morbi elementum urna vel pellentesque vehicula. Integer nec pellentesque elit. Proin consectetur, neque blandit vestibulum varius, neque nunc facilisis risus, nec feugiat mauris mi eget elit. Pellentesque tincidunt, libero id rhoncus luctus, mi ipsum commodo enim, vel feugiat urna purus a nulla. Ut accumsan dolor lectus, vel sodales magna sagittis sed.',
        dueDate: 1721305800000,
        creationDate: 1720441800000,
        priority: Priority.MEDIUM,
        status: Status.IN_PROGRESS,
    },
    6: {
        id: '6',
        title: 'Task 6',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ultrices mi. Nunc at ipsum erat. Morbi fermentum auctor elementum. Ut vitae elit diam. Nam posuere urna nec efficitur tincidunt. Vivamus accumsan interdum felis, vitae scelerisque lacus tempor et. Maecenas tempor scelerisque ullamcorper. Integer in libero ut ipsum mattis ultricies. Morbi et posuere mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam ornare mi leo, nec congue felis blandit at. Duis porttitor ante a libero sollicitudin, consectetur mattis eros vestibulum. Integer vel congue lectus, vulputate scelerisque magna. Cras dignissim auctor nunc, non aliquam felis pellentesque vel.',
        dueDate: 1721727000000,
        creationDate: 1720429305524,
        priority: Priority.HIGH,
        status: Status.COMPLETED,
    },
    7: {
        id: '7',
        title: 'Overdue Task 7',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pharetra finibus elit at suscipit. Cras tincidunt faucibus metus, et efficitur sapien aliquet ut. In luctus ligula in est pretium, non ullamcorper felis auctor. Quisque tincidunt leo et convallis ullamcorper. Sed luctus gravida dui, nec egestas libero varius eget. Maecenas suscipit convallis consequat. Maecenas est tellus, egestas eu est non, dictum pretium massa. Curabitur accumsan ligula pretium bibendum rutrum. Vestibulum semper velit sed ante suscipit feugiat.',
        priority: Priority.HIGH,
        dueDate: 1720597738000,
        status: Status.OPEN,
        creationDate: 1720009800000
    },
    8: {
        id: '8',
        title: 'Task Lorem ipsum dolor sit amet 8',
        description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur',
        priority: Priority.HIGH,
        dueDate: 1720597738000,
        status: Status.OPEN,
        creationDate: 1720009800000
    },
    9: {
        id: '9',
        creationDate: 1721030597132,
        title: 'Search Task',
        description: 'Implement search functionality. The user should be able to search for tasks by title or description. The search should be case-insensitive and should return all tasks that contain the search term. The search results should be displayed on the list. The search should be triggered by the user typing in the search box. The search bar is displayed at the top of the list next to the filter dropdown.',
        priority: Priority.HIGH,
        dueDate: 1721088000000,
        status: Status.COMPLETED
    },
    10: {
        id: '10',
        creationDate: 1721030597132,
        title: 'Fix Edit Task',
        description: 'Fix edit task by seeting the current task with useState hook when it\'s lodaded, and update the task without modifing the values should work correctly.',
        priority: Priority.HIGH,
        dueDate: 1721088000000,
        status: Status.COMPLETED
    },
    11: {
        id: '11',
        creationDate: 1721030597132,
        title: 'No Tasks',
        description: 'Implement No tasks message when there are no tasks to display. The message should be displayed in the center of the list.',
        priority: Priority.HIGH,
        dueDate: 1721088000000,
        status: Status.COMPLETED
    },
    12: {
        id: '12',
        creationDate: 1721030597132,
        title: 'Error handling',
        description: 'Implement error handling. Mock endpoint should return an error response. The UI should display an error message when the request fails.',
        priority: Priority.HIGH,
        dueDate: 1721088000000,
        status: Status.COMPLETED
    },
    13: {
        id: '13',
        creationDate: 1721030597132,
        title: 'Loading state',
        description: 'Implement loading state. The UI should display a loading spinner when the request is in progress.',
        priority: Priority.HIGH,
        dueDate: 1721088000000,
        status: Status.COMPLETED
    },
    14: {
        id: '14',
        creationDate: 1721030597132,
        title: 'Extensive Testing',
        description: 'Extensive testing should be done to ensure the application works as expected. The application should be tested on different devices and browsers. The application should be tested with different screen sizes. The application should be tested with different network speeds.',
        priority: Priority.HIGH,
        dueDate: 1721088000000,
        status: Status.COMPLETED
    },
    15: {
        id: '15',
        creationDate: 1721030597132,
        title: 'Styling',
        description: 'Implemt override bootstrap styles to match the design. The application should look like the design provided. The application should be responsive and should look good on all screen sizes.',
        priority: Priority.HIGH,
        dueDate: 1721088000000,
        status: Status.COMPLETED
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

const isValidPriority = (value: any): value is Priority => Object.values(Priority).includes(value);


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