import React, { useState } from 'react';
import { Dropdown, DropdownButton, Nav, Navbar } from 'react-bootstrap';
import { setFilterTasksByStatus } from '../tasksSlice';
import { useAppDispatch } from '../../../app/hooks';

const Filters = () => {

    const dispatch = useAppDispatch();
    const [filter, setFilter] = useState('all');
    const [sort, setSort] = useState('due-date');

    const handleFilterSelect = (eventKey: React.SetStateAction<string | null>) => {
        dispatch(setFilterTasksByStatus(eventKey?.toString() || 'all'));
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
                        onSelect={handleFilterSelect}
                        className="mr-2"
                    >
                        <Dropdown.Item eventKey="all">All</Dropdown.Item>
                        <Dropdown.Item eventKey="in-progress">In Progress</Dropdown.Item>
                        <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
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
