import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import {
    fetchTaskAsync,
    statusSelector,
    taskSelector,
} from './taskDetailsSlice';
import { Status } from '../../constants/Status';
import Container from 'react-bootstrap/esm/Container';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/esm/Card';
import Col from 'react-bootstrap/esm/Col';
import { PriorityIcon, StatusBadge } from '../../utils/icons';
import formatDate, { isOverdueDate } from '../../utils/date';
import Row from 'react-bootstrap/esm/Row';

function TaskDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const task = useAppSelector(taskSelector);
    const status = useAppSelector(statusSelector);

    useEffect(() => {
        if (id) dispatch(fetchTaskAsync(id));
    }, [dispatch, id]);

    if (status === Status.LOADING) return <div>Loading...</div>;
    if (status === Status.FAILED) return <div>Failed to load task</div>;

    return (
        <Container className="task-details mb-3">
            <h1 className='mb-3'>Task</h1>
            {task &&
                <>
                    <Row className="task-item-header align-items-center">
                        <Col xs={12} className="d-flex justify-content-between align-items-center">
                            <div className="task-title">
                                <h5 className="d-inline">{task.title} {PriorityIcon(task.priority)} {StatusBadge(task.status)}</h5>
                            </div>
                            <div className="task-actions">
                                <Button variant="outline-primary me-1" size='sm' onClick={() => console.log('click edit')}>Edit</Button>
                                <Button variant="outline-danger" size='sm' onClick={() => console.log('click delete')}>Delete</Button>
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
                            <Dropdown.Item href="#/action-1">Open</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">In Progress</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Completed</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>



                </>
            }
        </Container>
    )

}

export default TaskDetailsPage;