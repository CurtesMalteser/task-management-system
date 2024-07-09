import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
    Task,
    Priority,
    Status as TaskStatus,
} from "task-management-lib/lib/task";
import { Status } from "../../constants/Status";
import { fetchTasks } from './tasksApi';
import { RootState } from '../../app/store';

const priorityOrder: { [key in Priority]: number } = {
    [Priority.HIGH]: 3,
    [Priority.MEDIUM]: 2,
    [Priority.LOW]: 1,
};

export enum Sort {
    CREATION_DATE = 'creationDate',
    DUE_DATE = 'dueDate',
    PRIORITY = 'priority',
}

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
    sortBy: Sort.DUE_DATE,
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
        setSortTasks: (state, action) => {
            state.sortBy = action.payload;
        }
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

export const {
    setFilterTasksByStatus,
    setSortTasks,
} = tasksSlice.actions;

export const statusSelector = (state: RootState) => state.tasks.status;
export const taskStatusFilterSelector = (state: RootState) => state.tasks.taskStatusFilter;
export const sortSelector = (state: RootState) => state.tasks.sortBy;

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
                        return priorityB - priorityA && a.dueDate - b.creationDate;
                    }

                    return priorityB - priorityA;

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