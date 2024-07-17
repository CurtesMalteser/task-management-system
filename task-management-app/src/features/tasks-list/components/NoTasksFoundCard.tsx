import Card from "react-bootstrap/esm/Card";

const NoTasksFoundCard = () => (
    <Card className="mt-3">
        <Card.Body>
            <Card.Title className="text-center">No tasks found</Card.Title>
            <Card.Text className="text-center">
                Try changing the filters or add a new task
            </Card.Text>
        </Card.Body>
    </Card>
);

export default NoTasksFoundCard;