import { useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import ROUTES from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { Priority, Task } from 'task-management-lib/lib/task';
import {
    useAppDispatch,
    useAppSelector,
} from '../../app/hooks';
import {
    postTaskAsync,
    statusSelector as postTaskStatusSelector,
} from './newTaskSlice';
import { storeTask } from '../tasks-list/tasksSlice';
import { Status } from '../../constants/Status';
import TaskForm from './components/TaskForm';

function NewTask() {

    const dispatch = useAppDispatch();
    const status = useAppSelector(postTaskStatusSelector);

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<Priority>(Priority.LOW);
    const [dueDate, setDueDate] = useState<Date | null>(new Date());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        dispatch(postTaskAsync({
            title,
            description,
            priority,
            dueDate: dueDate ? dueDate.getTime() : 0,
        })).then((response) => {
            if (response.payload) {
                const task: Task = response.payload as Task;
                dispatch(storeTask(task));
                return task.id;
            } else {
                return null;
            }
        }).then((id: string | null) => {
            id && navigate(ROUTES.TASK.replace(':id', id), { replace: true });
        });
    };

    if (status === Status.LOADING) return (<div>Loading...</div>);
    if (status === Status.FAILED) return (<div>Failed...</div>);

    return (
        <Container className="md-8">
            <h1>Hello New Task Component</h1>
            <TaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                priority={priority}
                setPriority={setPriority}
                dueDate={dueDate}
                setDueDate={setDueDate}
                handleSubmit={handleSubmit}
                handleCancel={() => navigate(ROUTES.HOME, { replace: true })}
            />
        </Container>
    );
}

export default NewTask;