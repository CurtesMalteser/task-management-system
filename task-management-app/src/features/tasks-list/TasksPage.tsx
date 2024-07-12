import Container from "react-bootstrap/esm/Container";
import TasksBoard from "./components/TasksBoard";
import TasksList from "./components/TasksList";

function TasksPage() {

  return (
    <Container className="md-9">
      <h1>Home Page</h1>
      <TasksBoard />
      {/* <TasksList /> */}
    </Container>
  );
}

export default TasksPage;