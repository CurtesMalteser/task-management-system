import { createAsyncThunk, createSlice, isRejectedWithValue } from '@reduxjs/toolkit';
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

export enum ErrorType {
    FETCHING,
    UPDATING,
    DELETING,
}

interface TaskDetailsState {
    task: Task | null;
    status: Status;
    mode: Mode;
    errorType: ErrorType | null;
}

const initialState: TaskDetailsState = {
    task: null,
    status: Status.IDLE,
    mode: Mode.VIEW,
    errorType: null,
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
    async (id: string, {rejectWithValue}) => {
        try {
           return await deleteTask(id);
        } catch (error: unknown) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const taskDetailskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setMode: (state, action) => {
            state.mode = action.payload;
        },
        resetError: (state) => {
            state.status = Status.IDLE;
            state.errorType = null;
        }
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
                state.errorType = ErrorType.FETCHING;
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
                state.errorType = ErrorType.UPDATING;
            }).addCase(deleteTaskAsync.pending, (state) => {
                state.status = Status.LOADING;
            }).addCase(deleteTaskAsync.fulfilled, (state) => {
                state.task = null;
                state.status = Status.IDLE;
            }).addCase(deleteTaskAsync.rejected, (state) => {
                state.status = Status.FAILED;
                state.errorType = ErrorType.DELETING;
            });
    },
});

export const {
    setMode,
    resetError,
 } = taskDetailskSlice.actions;

export const statusSelector = (state: RootState) => state.taskDetails.status;
export const modeSelector = (state: RootState) => state.taskDetails.mode;
export const taskSelector = (state: RootState) => state.taskDetails.task;
export const errorSelector = (state: RootState) => state.taskDetails.errorType;

export default taskDetailskSlice.reducer;
