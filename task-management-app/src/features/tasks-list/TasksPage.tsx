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
import TasksColumn from "./components/TasksColumn";

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
        <TasksColumn title="To Do" tasks={tasks.filter(task => task.status === "open")} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)} />
        <TasksColumn title="In Progress" tasks={tasks.filter(task => task.status === "in-progress")} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)}/>
        <TasksColumn title="Done" tasks={tasks.filter(task => task.status === "completed")} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)}/>
      </Row>
      {status === Status.LOADING && <div>Loading...</div>}
      {status === Status.FAILED && <div>Failed...</div>}
    </Container>
  );
}

export default HomePage;