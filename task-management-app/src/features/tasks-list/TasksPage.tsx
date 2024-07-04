import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchTasksAsync,
  statusSelector as taskStatus,
  todoTasksSelector,
  inProgressTasksSelector,
  completedTasksSelector,
} from "../tasks-list/tasksSlice";
import { Status } from "../../constants/Status";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import TasksColumn from "./components/TasksColumn";

function TasksPage() {

  const dispatch = useAppDispatch();
  const todoTasks = useAppSelector(todoTasksSelector);
  const inProgressTasks = useAppSelector(inProgressTasksSelector);
  const completedTasks = useAppSelector(completedTasksSelector);
  const status = useAppSelector(taskStatus);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, [dispatch]);


  return (
    <Container className="md-9">
      <h1>Home Page</h1>
      <Row>
        <TasksColumn title="To Do" tasks={todoTasks} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)} />
        <TasksColumn title="In Progress" tasks={inProgressTasks} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)} />
        <TasksColumn title="Done" tasks={completedTasks} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)} />
      </Row>
      {status === Status.LOADING && <div>Loading...</div>}
      {status === Status.FAILED && <div>Failed...</div>}
    </Container>
  );
}

export default TasksPage;