import Container from "react-bootstrap/esm/Container";
import TasksBoard from "./components/TasksBoard";

function TasksPage() {

  return (
    <Container className="md-9">
      <h1>Home Page</h1>
      <TasksBoard />
    </Container>
  );
}

export default TasksPage;