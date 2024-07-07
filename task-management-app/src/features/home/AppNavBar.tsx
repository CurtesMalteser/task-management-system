import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ROUTES from '../../constants/routes';

function AppNavBar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" style={{ marginBottom: "48px" }}>
            <Container>
                <Navbar.Brand as={Link} to={ROUTES.HOME}>Employee Polls</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to={ROUTES.HOME}>Home</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.DASHBOARD}>Dashboard</Nav.Link>
                        <Nav.Link as={Link} to={ROUTES.NEW_TASK}>New</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavBar;