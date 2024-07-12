import Col from "react-bootstrap/esm/Col";
import { Task } from "task-management-lib/lib/task";
import TaskCard from "./TaskCard";
import formatDate from "../../../utils/date";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../constants/routes";

function TasksColumn({ title, tasks }: { title: string, tasks: Task[]}) {

    const navigate = useNavigate();

    const handleTaskClick = (id: string) => { navigate(ROUTES.TASK.replace(':id', id)) };

    return (
        <Col className="md-3">
            <h2>{title}</h2>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    title={task.title}
                    description={task.description}
                    dueDate={formatDate(task.dueDate)}
                    priority={task.priority}
                    status={task.status}
                    hanldeClick={() => handleTaskClick(task.id)}
                />
            ))}
        </Col>
    );
}

export default TasksColumn;