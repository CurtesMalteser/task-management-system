import {
    Mode,
} from '../taskDetailsSlice';
import { Task, Status as TaskStatus } from "task-management-lib/lib/task";
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import { PriorityIcon, StatusBadge } from '../../../utils/icons';
import formatDate, { isOverdueDate } from '../../../utils/date';
import Row from 'react-bootstrap/esm/Row';

export interface TaskDetailsCardProps {
    task: Task;
    updateTask: (task: Task) => void;
    setMode: (mode: Mode) => void, setShow: () => void;
}

const TaskDetailsCard: React.FC<TaskDetailsCardProps> = ({ task, updateTask, setMode, setShow }) => {
    return (<Card className="task-item-description mt-2">
        <Card.Body>
            <Row className="task-item-header align-items-center">
                <Col xs={12} className="d-flex justify-content-between align-items-center">
                    <Card.Title className="task-title">
                        <h5 className="d-inline">{task.title} {PriorityIcon(task.priority)} {StatusBadge(task.status)}</h5>
                    </Card.Title>
                </Col>
            </Row>
            <Card.Text>{task.description}</Card.Text>

            <Card.Text className={`task-item-date mt-2 mb-0 ${isOverdueDate(task.dueDate) ? 'overdue' : ''}`}>Due Date: {formatDate(task.dueDate)}</Card.Text>
            <Card.Text className="task-item-creation-date mt-2 mb-0">Created On: {formatDate(task.creationDate)}</Card.Text>

            <Row className="mt-3 align-items-center">
                <Col className="d-flex">
                    <Dropdown >
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Change Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => updateTask({
                                ...task,
                                status: TaskStatus.OPEN,
                            })}>Open</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateTask({
                                ...task,
                                status: TaskStatus.IN_PROGRESS
                            })}>In Progress</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateTask({
                                ...task,
                                status: TaskStatus.COMPLETED
                            })}>Completed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col className="task-actions d-flex justify-content-end">
                    <Button variant="outline-primary me-1" onClick={() => setMode(Mode.EDIT)}>Edit</Button>
                    <Button variant="outline-danger" onClick={setShow}>Delete</Button>
                </Col>
            </Row>
        </Card.Body>
    </Card>
    );
}

export default TaskDetailsCard;