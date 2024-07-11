import { useAppSelector } from "../../../app/hooks";
import {
    filteredTasksSelector,
} from "../tasksSlice";
import Filters from "./Filters";
import formatDate from "../../../utils/date";

function TasksList() {
    const tasks = useAppSelector(filteredTasksSelector);

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