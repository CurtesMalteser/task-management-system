import React from 'react';
import Card from 'react-bootstrap/esm/Card';
import Row from 'react-bootstrap/esm/Row';
import { PriorityIcon, StatusBadge } from '../../../utils/icons';
import { isOverdueDate } from '../../../utils/date';
import { TaskItemProps } from './TaskItem';
import './TaskItem.css';

const TaskCard: React.FC<TaskItemProps> = ({ title, description, dueDate, priority, status }) => {

    const isOverdue = isOverdueDate(dueDate);

    return (
        <Card className="task-item mb-3">
            <Card.Body className="task-item-header">
                <Row className="task-item-header">
                    <Card.Title className="task-item-header mt-2">{title}</Card.Title>
                    <Card.Text className="task-item-description mt-2">{description}</Card.Text>
                    <Card.Text className={`task-item-date mb-0 ${isOverdue ? 'overdue' : ''}`}>Due Date: {dueDate}</Card.Text>
                    <h5 className="d-inline mt-3">{PriorityIcon(priority)} {<span className='status-badge'>{StatusBadge(status)}</span>} </h5>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default TaskCard;
