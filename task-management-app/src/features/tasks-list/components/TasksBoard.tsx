import { useAppSelector } from "../../../app/hooks";
import {
    todoTasksSelector,
    inProgressTasksSelector,
    completedTasksSelector,
} from "../../tasks-list/tasksSlice";
import Row from "react-bootstrap/esm/Row";
import TasksColumn from "./TasksColumn";

function TasksBoard() {

    const todoTasks = useAppSelector(todoTasksSelector);
    const inProgressTasks = useAppSelector(inProgressTasksSelector);
    const completedTasks = useAppSelector(completedTasksSelector);

    return (
        <Row>
            <TasksColumn title="To Do" tasks={todoTasks} />
            <TasksColumn title="In Progress" tasks={inProgressTasks} />
            <TasksColumn title="Done" tasks={completedTasks} />
        </Row>
    );
}

export default TasksBoard;