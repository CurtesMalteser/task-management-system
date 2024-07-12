import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    Task,
} from "task-management-lib/lib/task";
import { Status } from "../../constants/Status";
import {
    fetchTask,
    updateTask,
} from './taskDetailsApi';
import { RootState } from '../../app/store';

export enum Mode {
    VIEW = 'view',
    EDIT = 'edit',
}

interface TaskDetailsState {
    task: Task | null;
    status: Status;
    mode: Mode;
}

const initialState: TaskDetailsState = {
    task: null,
    status: Status.IDLE,
    mode: Mode.VIEW,
};

export const fetchTaskAsync = createAsyncThunk(
    'task/fetchTask',
    async (id: string) => {
        const response = await fetchTask(id);
        return response;
    }
);

export const updateTaskAsync = createAsyncThunk(
    'task/updateTask',
    async (task: Task) => {
        const response = await updateTask(task);
        return response;
    }
);

export const taskDetailskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTaskAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(fetchTaskAsync.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.task = action.payload;
            })
            .addCase(fetchTaskAsync.rejected, (state) => {
                state.status = Status.FAILED;
            })
            .addCase(updateTaskAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.task = action.payload;
            })
            .addCase(updateTaskAsync.rejected, (state) => {
                state.status = Status.FAILED;
            });
    },
});

export const statusSelector = (state: RootState) => state.taskDetails.status;
export const modeSelector = (state: RootState) => state.taskDetails.mode;
export const taskSelector = (state: RootState) => state.taskDetails.task;

export default taskDetailskSlice.reducer;
