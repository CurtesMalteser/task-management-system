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
                <div key={task.id}>
                    <TaskItem   
                        title={task.title}
                        description={task.description}
                        dueDate={formatDate(task.dueDate)}
                        priority={task.priority}
                        status={task.status}
                        />
                </div>
            ))}
        </>
    );
}

export default TasksList;