import { useAppSelector } from "../../../app/hooks";
import {
    filteredTasksSelector,
} from "../tasksSlice";
import Filters from "./Filters";
import formatDate from "../../../utils/date";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

function TasksList() {
    const tasks = useAppSelector(filteredTasksSelector);

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsSmallScreen(window.innerWidth < 768);
        });

        return () => {
            window.removeEventListener('resize', () => {
                setIsSmallScreen(window.innerWidth < 768);
            });
        };
    }, []);

    return (
        <>
            <Filters />
            {tasks.map((task) => (
                isSmallScreen ? (
                    (<TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={formatDate(task.dueDate)}
                        priority={task.priority}
                        status={task.status}
                    />
                    )) : (<TaskItem
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={formatDate(task.dueDate)}
                        priority={task.priority}
                        status={task.status}
                    />
                )
            ))}
        </>
    );
}

export default TasksList;