import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { 
  fetchTasksAsync,
   selectTasks,
   selectStatus as taskStatus
   } from "../tasks-list/tasksSlice";
import { Status } from "../../constants/Status";


function HomePage() {

    const dispatch = useAppDispatch();
    const tasks = useAppSelector(selectTasks);
    const status = useAppSelector(taskStatus);

    useEffect(() => {
        dispatch(fetchTasksAsync());
    }, [dispatch]);
    

    return (
    <div>
      <h1>Home Page</h1>
      {status === Status.IDLE && tasks.map((task) => (<p key={task.id}>{task.title}</p>))}
      {status === Status.LOADING && <div>Loading...</div>}
      {status === Status.FAILED && <div>Failed...</div>}
    </div>
  );
}

export default HomePage;