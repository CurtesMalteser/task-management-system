import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    Task,
    TaskRequest,
} from "task-management-lib/lib/task";
import { Status } from "../../constants/Status";
import { postTask } from './newTaskApi';
import { RootState } from '../../app/store';


interface NewTaskState {
    task: Task | null;
    status: Status;
}

const initialState: NewTaskState = {
    task: null,
    status: Status.IDLE,
};

export const postTaskAsync = createAsyncThunk(
    'newTask/postTask',
    async (task: TaskRequest) => {
        const response = await postTask(task);
        return response;
    }
);

export const newTaskSlice = createSlice({
    name: 'newTask',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postTaskAsync.pending, (state) => {
                state.status = Status.LOADING;
            })
            .addCase(postTaskAsync.fulfilled, (state, action) => {
                state.status = Status.IDLE;
                state.task = action.payload;
            })
            .addCase(postTaskAsync.rejected, (state) => {
                state.status = Status.FAILED;
            });
    },
});

export const statusSelector = (state: RootState) => state.newTask.status;

export default newTaskSlice.reducer;
