import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ROUTES from '../../constants/routes';
import DarkModeToggle from '../../features/dark-mode/DarkModeToggle';

function AppNavBar() {

    const [expanded, setExpanded] = useState(false); 

    return (
        <Navbar expand="lg" className="navbar-dark bg-primary" style={{ marginBottom: "48px" }} expanded={expanded} onToggle={setExpanded}>
            <Container>
                <Navbar.Brand as={Link} to={ROUTES.HOME} onClick={() => setExpanded(false)}>Employee Polls</Navbar.Brand>
                <div className="d-flex align-items-center">
                    <DarkModeToggle className="d-lg-none me-2"/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(previousExpanded => !previousExpanded)} />
                </div>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={ROUTES.HOME} onClick={() => setExpanded(false)}>Home</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.DASHBOARD} onClick={() => setExpanded(false)}>Dashboard</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.NEW_TASK} onClick={() => setExpanded(false)}>New</Nav.Link>
                    </Nav>
                    <DarkModeToggle className="d-none d-lg-block"/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;