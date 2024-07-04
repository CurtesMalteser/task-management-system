import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTasksAsync,
  selectTasks,
  selectStatus as taskStatus
} from "../tasks-list/tasksSlice";
import { Status } from "../../constants/Status";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";


function HomePage() {

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const status = useAppSelector(taskStatus);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);


  return (
    <Container className="md-9">
      <h1>Home Page</h1>
      <Row>
        <Col>
          {
            status === Status.IDLE && tasks.map((task) => (
              <Card key={task.id}>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Card.Text>{task.dueDate}</Card.Text>
                  <Card.Text>{task.priority}</Card.Text>
                  <Card.Text>{task.status}</Card.Text>
                </Card.Body>
              </Card>
            ))
          }
        </Col>
      </Row>
      {status === Status.LOADING && <div>Loading...</div>}
      {status === Status.FAILED && <div>Failed...</div>}
    </Container>
  );
}

export default HomePage;