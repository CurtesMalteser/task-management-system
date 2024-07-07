import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { 
    fetchTasksAsync,
    statusSelector as taskStatus,
     tasksSelector,
     } from "../tasksSlice";
import { useEffect } from "react";
import { Status } from "../../../constants/Status";


function TasksList() {
    const dispatch = useAppDispatch();
    const tasks = useSelector(tasksSelector);
    const status = useAppSelector(taskStatus);

    useEffect(() => {
        dispatch(fetchTasksAsync());
    }, [dispatch]);

    if(status === Status.LOADING) return (<div>Loading...</div>);
    if(status === Status.FAILED) return (<div>Failed...</div>);


    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>{task.title}</div>
            ))}
        </div>
    );
}

export default TasksList;