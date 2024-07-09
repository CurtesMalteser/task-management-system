import React, { useState } from 'react';
import { Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import { setFilterTasksByStatus } from '../tasksSlice';
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

    const handleSortSelect = (eventKey: React.SetStateAction<string | null>) => {
        setSort(eventKey?.toString() || 'due-date');
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
                        onSelect={handleSortSelect}
                    >
                        <Dropdown.Item eventKey="due-date">Due Date</Dropdown.Item>
                        <Dropdown.Item eventKey="priority">Priority</Dropdown.Item>
                        <Dropdown.Item eventKey="creation-date">Creation Date</Dropdown.Item>
                    </DropdownButton>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Filters;
