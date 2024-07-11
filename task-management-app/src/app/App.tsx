import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ErrorPage from '../features/error/ErrorPage';
import ROUTES from '../constants/routes';
import HomeOutlet from '../features/home/HomeOutlet';
import TasksPage from '../features/tasks-list/TasksPage';
import NewTask from '../features/new-task/NewTask';
import DashboardPage from '../features/dashboard/DashboardPage';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomeOutlet />,
    errorElement: <ErrorPage />,
    children: [
      { path: ROUTES.HOME, element: <TasksPage /> },
      { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
      { path: ROUTES.NEW_TASK, element:  <NewTask />},

    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
