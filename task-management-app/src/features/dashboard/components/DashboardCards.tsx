import Card from "react-bootstrap/esm/Card";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { TaskStatistics } from "../tasksStatistics";

function DashboardCards({ statistics }: { statistics: TaskStatistics }) {

    const { completedTasksCount, inProgressTasksCount, overdueTasksCount } = statistics;

    return (
        <Row className="mb-3">
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Completed Tasks</Card.Title>
                        <Card.Text>{completedTasksCount}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Tasks In Progress</Card.Title>
                        <Card.Text>{inProgressTasksCount}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Body>
                        <Card.Title>Overdue Tasks</Card.Title>
                        <Card.Text>{overdueTasksCount}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default DashboardCards;