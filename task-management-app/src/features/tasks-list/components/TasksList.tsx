import { useAppSelector } from "../../../app/hooks";
import {
    filteredTasksSelector,
} from "../tasksSlice";
import Filters from "./Filters";
import formatDate from "../../../utils/date";
import TaskItem from "./TaskItem";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";
import NoTasksFoundCard from "./NoTasksFoundCard";

function TasksList() {

    const tasks = useAppSelector(filteredTasksSelector);

    const navigate = useNavigate();

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

    const handleTaskClick = (id: string) => { navigate(ROUTES.TASK.replace(':id', id)) };

    return (
        <>
            <Filters />
            {tasks.length === 0 && <NoTasksFoundCard />}
            {tasks.map((task) => (
                isSmallScreen ? (
                    (<TaskCard
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={formatDate(task.dueDate)}
                        priority={task.priority}
                        status={task.status}
                        hanldeClick={() => handleTaskClick(task.id)}
                    />
                    )) : (<TaskItem
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        dueDate={formatDate(task.dueDate)}
                        priority={task.priority}
                        status={task.status}
                        hanldeClick={() => handleTaskClick(task.id)}
                    />
                )
            ))}
        </>
    );
}

export default TasksList;