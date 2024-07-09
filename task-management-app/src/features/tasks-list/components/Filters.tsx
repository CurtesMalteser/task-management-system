import { useState } from 'react';
import { Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import {
    setFilterTasksByStatus,
    setSortTasks,
    Sort,
} from '../tasksSlice';
import { useAppDispatch } from '../../../app/hooks';
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
    const [filter, setFilter] = useState(taskStatusToString(null));
    const [sort, setSort] = useState(sortTasksToString(Sort.DUE_DATE));

    const handleFilterSelect = (status: TaskStatus | null) => {
        dispatch(setFilterTasksByStatus(status));
        setFilter(taskStatusToString(status));
    };

    const handleSortSelect = (sort: Sort) => {
        setSort(sortTasksToString(sort));
        dispatch(setSortTasks(sort));
    };

    return (
        <Navbar bg="light" expand="lg" className="mb-3">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <DropdownButton
                        id="filter-tasks-dropdown"
                        title={`Filter: ${filter}`}
                        className="mr-2"
                    >
                        <Dropdown.Item onClick={() => handleFilterSelect(null)} eventKey="all">All</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterSelect(TaskStatus.IN_PROGRESS)} eventKey="in-progress">In Progress</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterSelect(TaskStatus.COMPLETED)} eventKey="completed">Completed</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="sort-tasks-dropdown"
                        title={`Sort: ${sort}`}
                    >
                        <Dropdown.Item onClick={() => handleSortSelect(Sort.DUE_DATE)} eventKey="due-date">Due Date</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortSelect(Sort.PRIORITY)} eventKey="priority">Priority</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortSelect(Sort.CREATION_DATE)} eventKey="creation-date">Creation Date</Dropdown.Item>
                    </DropdownButton>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Filters;
