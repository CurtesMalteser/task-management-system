import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks-list/tasksSlice';
import newTaskReducer from '../features/new-task/newTaskSlice';
import taskDetailsReducer from '../features/details/taskDetailsSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    newTask: newTaskReducer,
    taskDetails: taskDetailsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
