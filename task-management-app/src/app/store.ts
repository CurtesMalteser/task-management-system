import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import darkModeReducer from '../features/dark-mode/darkModeSlice';
import tasksReducer from '../features/tasks-list/tasksSlice';
import newTaskReducer from '../features/new-task/newTaskSlice';
import taskDetailsReducer from '../features/details/taskDetailsSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
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
