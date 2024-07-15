import {
    createAsyncThunk,
    createSelector,
    createSlice,
} from '@reduxjs/toolkit';
import {
    Task,
    Priority,
    Status as TaskStatus,
} from 'task-management-lib/lib/task';
import { Status } from '../../constants/Status';
import { fetchTasks } from './tasksApi';
import { RootState } from '../../app/store';
import { isOverdueDate } from '../../utils/date';

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
    search: string;
}

const initialState: TasksState = {
    tasks: [],
    status: Status.IDLE,
    taskStatusFilter: null,
    sortBy: Sort.DUE_DATE,
    search: '',
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
        },
        storeTask: (state, action) => {
            const taskIndex = state.tasks.findIndex(task => task.id === action.payload.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = action.payload;
            } else {
                state.tasks.push(action.payload);
            }
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        searchTask: (state, action) => {
            state.search = action.payload;
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

export const {
    setFilterTasksByStatus,
    setSortTasks,
    storeTask,
    removeTask,
    searchTask,
} = tasksSlice.actions;

export const statusSelector = (state: RootState) => state.tasks.status;
export const taskStatusFilterSelector = (state: RootState) => state.tasks.taskStatusFilter;
export const sortSelector = (state: RootState) => state.tasks.sortBy;
export const searchSelector = (state: RootState) => state.tasks.search;

// #region filter tasks
function filterByStatus(tasks: Task[], status: TaskStatus | null) {
    return status
        ? tasks.filter(task => task.status === status)
        : tasks;
}

function filterBySearch(tasks: Task[], search: string) {
    const lowercasedSearch = search.toLowerCase();
    return tasks.filter(task =>
        task.title.toLowerCase().includes(lowercasedSearch) ||
        task.description.toLowerCase().includes(lowercasedSearch)
    );
}

function sortTasks(tasks: Task[], sortBy: Sort) {
    switch (sortBy) {
        case Sort.CREATION_DATE:
            return tasks.slice().sort((a: Task, b: Task) => a.creationDate - b.creationDate);
        case Sort.DUE_DATE:
            return tasks.slice().sort((a: Task, b: Task) => a.dueDate - b.dueDate);
        case Sort.PRIORITY:
            return tasks.slice().sort((a: Task, b: Task) => {
                const priorityA = priorityOrder[a.priority];
                const priorityB = priorityOrder[b.priority];
                return (priorityA === priorityB) ? a.dueDate - b.dueDate : priorityB - priorityA;
            });
        default:
            return tasks;
    }
}

export const filteredTasksSelector = createSelector(
    (state: RootState) => state.tasks.tasks,
    (state: RootState) => state.tasks.taskStatusFilter,
    (state: RootState) => state.tasks.sortBy,
    (state: RootState) => state.tasks.search,
    (tasks, taskStatusFilter, sortBy, search) => {
        const filteredTasks = filterByStatus(tasks, taskStatusFilter);
        const filteredTasksBySearch = filterBySearch(filteredTasks, search);
        return sortTasks(filteredTasksBySearch, sortBy);
    }
);
// #endregion filter tasks

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

export const overdueTasksSelector = createSelector(
    (state: RootState) => state.tasks.tasks,
    (tasks) => tasks.filter(task => isOverdueDate(task.dueDate) && task.status !== 'completed')
);

export default tasksSlice.reducer;