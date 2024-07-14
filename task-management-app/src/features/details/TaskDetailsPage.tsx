import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import {
    deleteTaskAsync,
    fetchTaskAsync,
    statusSelector,
    taskSelector,
    updateTaskAsync,
} from './taskDetailsSlice';
import { removeTask, storeTask } from '../tasks-list/tasksSlice';
import { Task, Status as TaskStatus } from "task-management-lib/lib/task";
import { Status } from '../../constants/Status';
import Container from 'react-bootstrap/esm/Container';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import { PriorityIcon, StatusBadge } from '../../utils/icons';
import formatDate, { isOverdueDate } from '../../utils/date';
import Row from 'react-bootstrap/esm/Row';
import DeleteTaskModal from './components/DeleteTaskModal';
import ROUTES from '../../constants/routes';

interface TaskDetailsHook {
    showUseState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    updateStatus: (status: TaskStatus, task: Task) => void;
    deleteTask: (handleClose: () => void) => void;
}

const useTaskDetails = (id: string | undefined): TaskDetailsHook => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchTaskAsync(id));
        }
    }, [dispatch, id]);

    const updateStatus = (status: TaskStatus, task: Task) => {
        dispatch(updateTaskAsync({
            ...task,
            status,
        })).then((response) => {
            if (response.payload) {
                dispatch(storeTask(response.payload));
            }
        });
    };

    const deleteTask = (handleClose: () => void) => {
        if (id) {
            dispatch(deleteTaskAsync(id))
                .then(() => {
                    dispatch(removeTask(id));
                }).then(() => {
                    handleClose()
                }).then(() => {
                    navigate(ROUTES.HOME, { replace: true });
                });
        }
    }

    return { updateStatus, deleteTask, showUseState: [show, setShow] };
};


function TaskDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const { updateStatus, deleteTask, showUseState: [show, setShow] }: TaskDetailsHook = useTaskDetails(id);

    const handleClose = () => setShow(false);

    const task = useAppSelector(taskSelector);
    const status = useAppSelector(statusSelector);

    if (status === Status.LOADING) return <div>Loading...</div>;
    if (status === Status.FAILED) return <div>Failed to load task</div>;

    return (
        <Container className="task-details mb-3">
            <h1 className='mb-3'>Task</h1>
            {task &&
                <>
                    <DeleteTaskModal
                        show={show}
                        taskTitle={task.title}
                        handleClose={handleClose}
                        handleDelete={() => deleteTask(handleClose)}
                    />
                    <Row className="task-item-header align-items-center">
                        <Col xs={12} className="d-flex justify-content-between align-items-center">
                            <div className="task-title">
                                <h5 className="d-inline">{task.title} {PriorityIcon(task.priority)} {StatusBadge(task.status)}</h5>
                            </div>
                            <div className="task-actions">
                                <Button variant="outline-primary me-1" size='sm' onClick={() => console.log('click edit')}>Edit</Button>
                                <Button variant="outline-danger" size='sm' onClick={() => setShow(true)}>Delete</Button>
                            </div>
                        </Col>
                    </Row>
                    <Card className="task-item-description mt-2">
                        <Card.Body>
                            <p>{task.description}</p>
                        </Card.Body>
                    </Card>
                    <p className={`task-item-date mt-2 mb-0 ${isOverdueDate(task.dueDate) ? 'overdue' : ''}`}>Due Date: {formatDate(task.dueDate)}</p>
                    <p className="task-item-creation-date mt-2 mb-0">Created On: {formatDate(task.creationDate)}</p>
                    <Dropdown className="mt-3">
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Change Status
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => updateStatus(TaskStatus.OPEN, task)}>Open</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateStatus(TaskStatus.IN_PROGRESS, task)}>In Progress</Dropdown.Item>
                            <Dropdown.Item onClick={() => updateStatus(TaskStatus.COMPLETED, task)}>Completed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            }
        </Container>
    )

}

export default TaskDetailsPage;