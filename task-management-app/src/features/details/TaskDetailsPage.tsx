import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import {
    statusSelector,
    taskSelector,
    modeSelector,
    Mode,
    errorSelector,
    ErrorType,
} from './taskDetailsSlice';
import { Priority } from "task-management-lib/lib/task";
import { Status } from '../../constants/Status';
import Container from 'react-bootstrap/esm/Container';
import DeleteTaskModal from './components/DeleteTaskModal';
import TaskForm from '../new-task/components/TaskForm';
import ErrorPage from '../error/ErrorPage';
import { Alert } from 'react-bootstrap';
import LoadingScreen from '../loader/LoadingScreen';
import { TaskDetailsHook, useTaskDetails } from './hooks/useTaskDetails';
import TaskDetailsCard from './components/TaskDetailsCard';


function errorMessage(errorType: ErrorType | null): string {
    switch (errorType) {
        case ErrorType.UPDATING:
            return 'Error: Unable to update the task. Please try again.';
        case ErrorType.DELETING:
            return 'Error: Unable to delete the task. Please try again.';
        default:
            return 'Error: Unable to perform the operation. Please try again.';
    }
}

function TaskDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const {
        updateTask,
        deleteTask,
        showModal: show,
        setShowModal: setShow,
        setMode,
        updatedTask,
        setUpdatedTask,
        dispatchResetError,
    }: TaskDetailsHook = useTaskDetails(id);

    const handleClose = () => setShow(false);

    const task = useAppSelector(taskSelector);
    const status = useAppSelector(statusSelector);
    const mode = useAppSelector(modeSelector);
    const errorType = useAppSelector(errorSelector);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const sumbmitTask = updatedTask ?? task;
        sumbmitTask && updateTask(sumbmitTask)
    };

    if (status === Status.LOADING) return (<LoadingScreen />);
    if (status === Status.FAILED && errorType === ErrorType.FETCHING) return (<ErrorPage />);

    return (
        <Container className="task-details mb-3">
            <Alert
                variant="danger"
                show={status === Status.FAILED}
                onClose={dispatchResetError}
                dismissible
            >
                {errorMessage(errorType)}
            </Alert>
            <h1 className='mb-3'>Task</h1>
            {(mode === Mode.EDIT)
                && task
                && (<TaskForm
                    title={(updatedTask ?? task).title}
                    setTitle={(title: string) => setUpdatedTask({
                        ...(updatedTask ?? task),
                        title
                    })}
                    description={(updatedTask ?? task).description}
                    setDescription={(description: string) => setUpdatedTask({
                        ...(updatedTask ?? task),
                        description
                    })}
                    priority={(updatedTask ?? task).priority}
                    setPriority={(priority: Priority) => setUpdatedTask({
                        ...(updatedTask ?? task),
                        priority
                    })}
                    dueDate={new Date((updatedTask ?? task).dueDate)}
                    setDueDate={(date: Date | null) => {
                        setUpdatedTask({
                            ...(updatedTask ?? task),
                            dueDate: date?.getTime() ?? 0
                        })
                    }}
                    handleSubmit={handleSubmit}
                    handleCancel={() => {
                        // Reset the updated task to the original task
                        setUpdatedTask(task);
                        setMode(Mode.VIEW);
                    }}

                />)}
            {(mode === Mode.VIEW) && task &&
                <>
                    <DeleteTaskModal
                        show={show}
                        taskTitle={task.title}
                        handleClose={handleClose}
                        handleDelete={() => deleteTask(handleClose)}
                    />
                    <TaskDetailsCard task={task} updateTask={updateTask} setMode={setMode} setShow={() => setShow(true)} />
                </>
            }
        </Container>
    )
}

export default TaskDetailsPage;