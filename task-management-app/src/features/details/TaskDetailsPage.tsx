import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect, useState } from 'react';
import {
    deleteTaskAsync,
    fetchTaskAsync,
    statusSelector,
    taskSelector,
    updateTaskAsync,
    modeSelector,
    Mode,
    setMode as setModeAction,
} from './taskDetailsSlice';
import { removeTask, storeTask } from '../tasks-list/tasksSlice';
import { Priority, Task, Status as TaskStatus } from "task-management-lib/lib/task";
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
import TaskForm from '../new-task/components/TaskForm';

interface TaskDetailsHook {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    updatedTask: Task | null;
    setUpdatedTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (handleClose: () => void) => void;
    setMode: (mode: Mode) => void;
}

const useTaskDetails = (id: string | undefined): TaskDetailsHook => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [show, setShow] = useState(false);
    const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

    useEffect(() => {
        if (id) {
            dispatch(fetchTaskAsync(id));
        }
    }, [dispatch, id]);

    const setMode = (mode: Mode) => {
        dispatch(setModeAction(mode));
    };

    const updateTask = (task: Task) => {
        dispatch(updateTaskAsync(task))
            .then((response) => {
                if (response.payload) {
                    dispatch(storeTask(response.payload));
                }
            }).then(() => {
                setMode(Mode.VIEW);
            })
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

    return {
        updateTask,
        deleteTask,
        showModal: show,
        setShowModal: setShow,
        setMode,
        updatedTask,
        setUpdatedTask,
    };
};


function TaskDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const {
        updateTask,
        deleteTask,
        showModal: show,
        setShowModal: setShow,
        setMode,
        updatedTask,
        setUpdatedTask,
    }: TaskDetailsHook = useTaskDetails(id);

    const handleClose = () => setShow(false);

    const task = useAppSelector(taskSelector);
    const status = useAppSelector(statusSelector);
    const mode = useAppSelector(modeSelector);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        updatedTask && updateTask(updatedTask)
    };

    if (status === Status.LOADING) return <div>Loading...</div>;
    if (status === Status.FAILED) return <div>Failed to load task</div>;

    return (
        <Container className="task-details mb-3">
            <h1 className='mb-3'>Task</h1>
            {(mode === Mode.EDIT) && task && <TaskForm
                title={(updatedTask ?? task).title}
                setTitle={(title: string) => setUpdatedTask({
                    ...(updatedTask ?? task),
                    title
                })}
                description={(updatedTask ?? task).description}
                setDescription={(description: string) => setUpdatedTask({
                    ...(updatedTask ?? task),
                    description
                })}
                priority={(updatedTask ?? task).priority}
                setPriority={(priority: Priority) => setUpdatedTask({
                    ...(updatedTask ?? task),
                    priority
                })}
                dueDate={new Date((updatedTask ?? task).dueDate)}
                setDueDate={(date: Date | null) => {
                    setUpdatedTask({
                        ...(updatedTask ?? task),
                        dueDate: date?.getTime() ?? 0
                    })
                }}
                handleSubmit={handleSubmit}
                handleCancel={() => setMode(Mode.VIEW)}

            />}
            {(mode === Mode.VIEW) && task &&
                <>
                    <DeleteTaskModal
                        show={show}
                        taskTitle={task.title}
                        handleClose={handleClose}
                        handleDelete={() => deleteTask(handleClose)}
                    />
                    <Card className="task-item-description mt-2">
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
                                        <Button variant="outline-primary me-1"  onClick={() => setMode(Mode.EDIT)}>Edit</Button>
                                        <Button variant="outline-danger" onClick={() => setShow(true)}>Delete</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </>
            }
        </Container>
    )
}

export default TaskDetailsPage;