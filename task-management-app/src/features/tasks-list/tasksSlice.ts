import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { Task } from "task-management-lib/src/task";
import { Status } from "../../constants/Status";
import { fetchTasks } from './tasksApi';
import { RootState } from '../../app/store';

interface TasksState {
    tasks: Task[];
    status: Status;
}

const initialState: TasksState = {
    tasks: [],
    status: Status.IDLE,
};

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
    reducers: {},
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

export const statusSelector = (state: RootState) => state.tasks.status;
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