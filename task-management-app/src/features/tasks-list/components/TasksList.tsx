import { useAppSelector } from "../../../app/hooks";
import {
    filteredTasksSelector,
} from "../tasksSlice";
import Filters from "./Filters";
import formatDate from "../../../utils/date";
import TaskItem from "./TaskItem";

function TasksList() {
    const tasks = useAppSelector(filteredTasksSelector);

    return (
        <>
            <Filters />
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    dueDate={formatDate(task.dueDate)}
                    priority={task.priority}
                    status={task.status}
                />
            ))}
        </>
    );
}

export default TasksList;