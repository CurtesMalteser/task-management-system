import Navbar from 'react-bootstrap/esm/Navbar';
import Dropdown from 'react-bootstrap/esm/Dropdown';
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
    setFilterTasksByStatus,
    setSortTasks,
    Sort,
    sortSelector,
    taskStatusFilterSelector,
} from '../tasksSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Status as TaskStatus } from "task-management-lib/lib/task";


// #region utils
const taskStatusToString = (status: TaskStatus | null) => {
    switch (status) {
        case TaskStatus.IN_PROGRESS:
            return 'In Progress';
        case TaskStatus.COMPLETED:
            return 'Completed';
        default:
            return 'All';
    }
};

const sortTasksToString = (sort: Sort) => {
    switch (sort) {
        case Sort.DUE_DATE:
            return 'Due Date';
        case Sort.PRIORITY:
            return 'Priority';
        case Sort.CREATION_DATE:
            return 'Creation Date';
    }
};

// #endregion utils

const Filters = () => {

    const dispatch = useAppDispatch();
    const filterBy = useAppSelector(taskStatusFilterSelector);
    const sortBy = useAppSelector(sortSelector);

    const handleFilterSelect = (status: TaskStatus | null) => {
        dispatch(setFilterTasksByStatus(status));
    };

    const handleSortSelect = (sort: Sort) => {
        dispatch(setSortTasks(sort));
    };

    return (
        <Navbar bg="light" className="mb-3">
            <DropdownButton
                id="filter-tasks-dropdown"
                title={`Filter: ${taskStatusToString(filterBy)}`}
                className="me-2"
            >
                <Dropdown.Item onClick={() => handleFilterSelect(null)} eventKey="all">All</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect(TaskStatus.IN_PROGRESS)} eventKey="in-progress">In Progress</Dropdown.Item>
                <Dropdown.Item onClick={() => handleFilterSelect(TaskStatus.COMPLETED)} eventKey="completed">Completed</Dropdown.Item>
            </DropdownButton>
            <DropdownButton
                id="sort-tasks-dropdown"
                title={`Sort: ${sortTasksToString(sortBy)}`}
            >
                <Dropdown.Item onClick={() => handleSortSelect(Sort.DUE_DATE)} eventKey="due-date">Due Date</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortSelect(Sort.PRIORITY)} eventKey="priority">Priority</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortSelect(Sort.CREATION_DATE)} eventKey="creation-date">Creation Date</Dropdown.Item>
            </DropdownButton>
            <Form className="ms-3">
                <Row >
                    <Col xs="auto" style={{paddingRight:'0px'}}>
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="mr-sm-2"
                        />
                    </Col>
                    <Col style={{paddingLeft:'0px'}} className='ms-2'>
                        <Button type="submit">Submit</Button>
                    </Col>
                </Row>
            </Form>
        </Navbar>
    );
};

export default Filters;
