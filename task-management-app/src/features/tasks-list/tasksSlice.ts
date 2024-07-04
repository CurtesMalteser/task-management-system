import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from "../../../../lib/src/task";
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

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectStatus = (state: RootState) => state.tasks.status;

export default tasksSlice.reducer;