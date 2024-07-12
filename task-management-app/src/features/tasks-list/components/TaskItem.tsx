import React from 'react';
import { Priority, Status } from 'task-management-lib/lib/task';
import Card from 'react-bootstrap/esm/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { PriorityIcon, StatusBadge } from '../../../utils/icons';
import './TaskItem.css';

interface TaskItemProps {
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
    status: Status;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, description, dueDate, priority, status }) => {

    return (
        <Card className="task-item mb-3">
            <Card.Body>
                <Row className="task-item-header align-items-center">
                    <Col xs={12} sm={8}>
                        <h4 className="d-inline">{title} {PriorityIcon(priority)} {<span className='status-badge'>{StatusBadge(status)}</span>} </h4>
                    </Col>
                    <Col xs={12} sm={4} className="text-sm-right">
                        <p className="task-item-date mb-0">Due Date: {dueDate}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p className="task-item-description mt-2">{description}</p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TaskItem;
