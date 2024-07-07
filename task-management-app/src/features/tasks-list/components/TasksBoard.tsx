import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    fetchTasksAsync,
    statusSelector as taskStatus,
    todoTasksSelector,
    inProgressTasksSelector,
    completedTasksSelector,
} from "../../tasks-list/tasksSlice";
import { Status } from "../../../constants/Status";
import Row from "react-bootstrap/esm/Row";
import TasksColumn from "./TasksColumn";

function TasksBoard() {

    const dispatch = useAppDispatch();
    const todoTasks = useAppSelector(todoTasksSelector);
    const inProgressTasks = useAppSelector(inProgressTasksSelector);
    const completedTasks = useAppSelector(completedTasksSelector);
    const status = useAppSelector(taskStatus);

    useEffect(() => {
        dispatch(fetchTasksAsync());
    }, [dispatch]);

    if(status === Status.LOADING) return (<div>Loading...</div>);
    if(status === Status.FAILED) return (<div>Failed...</div>);

    return (
        <Row>
            <TasksColumn title="To Do" tasks={todoTasks} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)} />
            <TasksColumn title="In Progress" tasks={inProgressTasks} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)} />
            <TasksColumn title="Done" tasks={completedTasks} statusHandler={({ id, status }) => console.log(`id: ${id}, status: ${status}`)} />
        </Row>
    );
}

export default TasksBoard;