import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    fetchTasksAsync,
    statusSelector as taskStatus,
    filteredTasksSelector,
} from "../tasksSlice";
import { useEffect } from "react";
import { Status } from "../../../constants/Status";
import Filters from "./Filters";
import formatDate from "../../../utils/date";

function TasksList() {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(filteredTasksSelector);
    const status = useAppSelector(taskStatus);

    useEffect(() => {
        dispatch(fetchTasksAsync());
    }, [dispatch]);

    if (status === Status.LOADING) return (<div>Loading...</div>);
    if (status === Status.FAILED) return (<div>Failed...</div>);


    return (
        <>
            <Filters />
            {tasks.map((task) => (
                <div key={task.id}>
                    {task.id} | {task.title} | {task.priority} | {task.status} | {formatDate(task.dueDate)} | {formatDate(task.creationDate)}
                </div>
            ))}
        </>
    );
}

export default TasksList;