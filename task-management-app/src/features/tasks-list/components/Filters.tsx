import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
    setFilterTasksByStatus,
    setSortTasks,
    Sort,
    sortSelector,
    taskStatusFilterSelector,
    searchTask,
    searchSelector,
} from '../tasksSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { Status as TaskStatus } from "task-management-lib/lib/task";
import { ReactComponent as Filter } from '../../../assets/svg/filter.svg';
import './Filters.css';

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
    const search = useAppSelector(searchSelector);

    const handleFilterSelect = (status: TaskStatus | null) => {
        dispatch(setFilterTasksByStatus(status));
    };

    const handleSortSelect = (sort: Sort) => {
        dispatch(setSortTasks(sort));
    };

    const dispatchSearchTask = (search: string) => {
        dispatch(searchTask(search));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (search.trim() !== '') dispatchSearchTask(search);
    }

    return (
        <Navbar expand="lg" className='mb-3 filter-navbar'>
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll">
                    <Filter className="filter-size filter-style" />
                </Navbar.Toggle>
                <Navbar.Collapse id="navbarScroll">
                    <DropdownButton
                        id="filter-tasks-dropdown"
                        title={`Filter: ${taskStatusToString(filterBy)}`}
                        className="me-2 mb-3 mb-lg-0"
                    >
                        <Dropdown.Item onClick={() => handleFilterSelect(null)} eventKey="all">All</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterSelect(TaskStatus.IN_PROGRESS)} eventKey="in-progress">In Progress</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFilterSelect(TaskStatus.COMPLETED)} eventKey="completed">Completed</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton
                        id="sort-tasks-dropdown"
                        title={`Sort: ${sortTasksToString(sortBy)}`}
                        className="me-2 mb-3 mb-lg-0"
                    >
                        <Dropdown.Item onClick={() => handleSortSelect(Sort.DUE_DATE)} eventKey="due-date">Due Date</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortSelect(Sort.PRIORITY)} eventKey="priority">Priority</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortSelect(Sort.CREATION_DATE)} eventKey="creation-date">Creation Date</Dropdown.Item>
                    </DropdownButton>
                    <Form onSubmit={handleSubmit} className="d-flex mt-3 mt-lg-0 ms-auto mb-3 mb-lg-0">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                            className="me-2"
                            value={search}
                            onChange={(e) => dispatchSearchTask(e.target.value)}
                        />
                        <Button type="submit">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Filters;
