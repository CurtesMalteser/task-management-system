import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Button from "react-bootstrap/esm/Button";
import { Task } from "../../../../../lib/src/task";

function TasksColumn({ title, tasks, statusHandler }: { title: string, tasks: Task[], statusHandler: ({ id, status }: { id: string, status: string }) => void }) {
    return (
        <Col className="md-3">
            <h2>{title}</h2>
            {tasks.map((task) => (
                <Card className="md-3" key={task.id}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <Card.Text>{task.dueDate}</Card.Text>
                        <Card.Text>{task.priority}</Card.Text>
                        <Button
                            variant="primary"
                            onClick={() => statusHandler({ id: task.id, status: 'completed' })}
                        >Complete</Button>
                    </Card.Body>
                </Card>
            ))}
        </Col>
    );
}

export default TasksColumn;