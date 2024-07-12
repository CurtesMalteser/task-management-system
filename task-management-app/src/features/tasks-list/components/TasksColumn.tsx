import Col from "react-bootstrap/esm/Col";
import { Task } from "task-management-lib/lib/task";
import TaskCard from "./TaskCard";
import formatDate from "../../../utils/date";

function TasksColumn({ title, tasks, statusHandler }: { title: string, tasks: Task[], statusHandler: ({ id, status }: { id: string, status: string }) => void }) {
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
                />
            ))}
        </Col>
    );
}

export default TasksColumn;