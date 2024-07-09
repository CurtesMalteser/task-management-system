import React, { useState } from 'react';
import { Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import {
    setFilterTasksByStatus,
    setSortTasks,
    Sort,
} from '../tasksSlice';
import { useAppDispatch } from '../../../app/hooks';
import { Status as TaskStatus } from "task-management-lib/lib/task";

const Filters = () => {

    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('due-date');

    const handleFilterSelect = (eventKey: TaskStatus | null) => {
        dispatch(setFilterTasksByStatus(eventKey));
        setFilter(eventKey?.toString() || 'all');
    };

    const handleSortSelect = (sort: Sort) => {
        setSort(sort.toString() || 'due-date');
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
