import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import ROUTES from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import TitleFormGroup from './components/TitleFormGroup';
import DescriptionFormGroup from './components/DescriptionFormGroup';
import TaskDatePicker from './components/TaskDatePicker';
import PriorityFormSelect from './components/PriorityFormSelect';
import { Priority, Task } from 'task-management-lib/lib/task';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
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
            <Form onSubmit={handleSubmit} >
                <TitleFormGroup
                    value={title}
                    onChange={setTitle}
                />
                <DescriptionFormGroup
                    value={description}
                    onChange={setDescription}
                />
                <Row className='mb-3'>
                    <Col>
                        <PriorityFormSelect
                            value={priority}
                            onChange={setPriority}
                        />
                    </Col>
                    <Col>
                        <TaskDatePicker
                            selected={dueDate}
                            handleDateChange={setDueDate}
                        />
                    </Col>
                </Row>


                <>
                    <Button as="input"
                        type="submit"
                        variant="primary"
                        value="Save"
                    />
                    {' '} {/* Add a space between the buttons */}
                    <Button
                        as="input"
                        type="button"
                        variant='outline-primary'
                        value="Cancel"
                        onClick={() => navigate(ROUTES.HOME)}
                    />
                </>
            </Form>
        </Container>
    );
}

export default NewTask;