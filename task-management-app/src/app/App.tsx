import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useEffect } from 'react';
import {
  useAppDispatch, useAppSelector,
} from './hooks';
import {
  fetchTasksAsync,
  statusSelector as taskStatus,
} from '../features/tasks-list/tasksSlice';
import ErrorPage from '../features/error/ErrorPage';
import ROUTES from '../constants/routes';
import HomeOutlet from '../features/home/HomeOutlet';
import TasksPage from '../features/tasks-list/TasksPage';
import NewTask from '../features/new-task/NewTask';
import DashboardPage from '../features/dashboard/DashboardPage';
import { Status } from '../constants/Status';
import TaskDetailsPage from '../features/details/TaskDetailsPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomeOutlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.HOME, element: <TasksPage /> },
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.NEW_TASK, element: <NewTask /> },
      { path: ROUTES.TASK, element: <TaskDetailsPage /> }
    ],
  },
]);

function App() {

  const dispatch = useAppDispatch();
  const status = useAppSelector(taskStatus);


  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);

  if (status === Status.LOADING) return (<div>Loading...</div>);
  if (status === Status.FAILED) return (<div>Failed...</div>);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
