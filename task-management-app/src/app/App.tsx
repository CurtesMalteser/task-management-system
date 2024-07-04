import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from '../features/error/ErrorPage';
import ROUTES from '../constants/routes';
import WorkInProgressError from '../features/error/WorkInProgressError';
import HomeOutlet from '../features/home/HomeOutlet';
import TasksPage from '../features/tasks-list/TasksPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomeOutlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.HOME, element: <TasksPage /> },
      { path: ROUTES.DASHBOARD, element: <WorkInProgressError pageTitle='Dashboard'/> },
      { path: ROUTES.NEW_TASK, element: <WorkInProgressError pageTitle='New Task'/> },

    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
