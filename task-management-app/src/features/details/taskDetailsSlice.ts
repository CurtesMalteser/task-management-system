import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    Task,
} from "task-management-lib/lib/task";
import { Status } from "../../constants/Status";
import {
    deleteTask,
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

export const deleteTaskAsync = createAsyncThunk(
    'task/deleteTask',
    async (id: string) => await deleteTask(id)
);

export const taskDetailskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
    },
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
            }).addCase(deleteTaskAsync.pending, (state) => {
                state.status = Status.LOADING;
            }).addCase(deleteTaskAsync.fulfilled, (state) => {
                state.task = null;
                state.status = Status.IDLE;
            }).addCase(deleteTaskAsync.rejected, (state) => {
                state.status = Status.FAILED;
            });
    },
});

export const { setMode } = taskDetailskSlice.actions;

export const statusSelector = (state: RootState) => state.taskDetails.status;
export const modeSelector = (state: RootState) => state.taskDetails.mode;
export const taskSelector = (state: RootState) => state.taskDetails.task;

export default taskDetailskSlice.reducer;
