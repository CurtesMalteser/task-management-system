import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { Task } from "task-management-lib/lib/task";
import { Status } from "../../constants/Status";
import { fetchTasks } from './tasksApi';
import { RootState } from '../../app/store';

export enum TaskStatus {
    IN_PROGRESS = 'in-progress',
    COMPLETED = 'completed',
}

export enum Sort {
    CREATION_DATE = 'creationDate',
    DUE_DATE = 'dueDate',
    PRIORITY = 'priority',
}

export const priorityOrder: { [key in string]: number } = {
    ['low']: 3,
    ['medium']: 2,
    ['high']: 1,
};

interface TasksState {
    tasks: Task[];
    status: Status;
    taskStatusFilter: TaskStatus | null;
    sortBy: Sort;
}

const initialState: TasksState = {
    tasks: [],
    status: Status.IDLE,
    taskStatusFilter: null,
    sortBy: Sort.PRIORITY,
};

// If there's time don't fetch if the data is already in the store
// Think about force fetch to get the latest data
export const fetchTasksAsync = createAsyncThunk(
    'tasks/fetchTasks',
    async () => {
        const response = await fetchTasks();
        return response;
    }
);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setFilterTasksByStatus: (state, action) => {
            switch (action.payload) {
                case 'in-progress':
                    state.taskStatusFilter = TaskStatus.IN_PROGRESS;
                    break;
                case 'completed':
                    state.taskStatusFilter = TaskStatus.COMPLETED;
                    break;
                default:
                    state.taskStatusFilter = null;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchTasksAsync.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.tasks = action.payload.tasks;
            })
            .addCase(fetchTasksAsync.rejected, (state) => {
                state.status = Status.FAILED;
            });
    },
});

export const { setFilterTasksByStatus } = tasksSlice.actions;

export const statusSelector = (state: RootState) => state.tasks.status;

export const filteredTasksSelector = createSelector(
    (state: RootState) => state.tasks.tasks,
    (state: RootState) => state.tasks.taskStatusFilter,
    (state: RootState) => state.tasks.sortBy,
    (tasks, taskStatusFilter, sortBy) => {

        const filteredTasks = taskStatusFilter
            ? tasks.filter(task => task.status.toLocaleLowerCase() === taskStatusFilter.toLocaleLowerCase())
            : tasks;

        switch (sortBy) {
            case Sort.CREATION_DATE:
                return [...filteredTasks].sort((a: Task, b: Task) => a.creationDate - b.creationDate);
            case Sort.DUE_DATE:
                return [...filteredTasks].sort((a: Task, b: Task) => a.dueDate - b.dueDate);
            case Sort.PRIORITY:
                return [...filteredTasks].sort((a: Task, b: Task) => {
                    const priorityA = priorityOrder[a.priority];
                    const priorityB = priorityOrder[b.priority];

                    if (priorityA === priorityB) {
                        return a.dueDate - b.creationDate;
                    }
                    return priorityA - priorityB;

                });
            default:
                return filteredTasks;
        }
    }
);

export const todoTasksSelector = createSelector(
    (state: RootState) => state.tasks.tasks,
    (tasks) => tasks.filter(task => task.status === "open")
);

export const inProgressTasksSelector = createSelector(
    (state: RootState) => state.tasks.tasks,
    (tasks) => tasks.filter(task => task.status === "in-progress")
);

export const completedTasksSelector = createSelector(
    (state: RootState) => state.tasks.tasks,
    (tasks) => tasks.filter(task => task.status === "completed")
);

export default tasksSlice.reducer;