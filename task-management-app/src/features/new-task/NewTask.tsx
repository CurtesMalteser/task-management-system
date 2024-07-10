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
import { Priority } from 'task-management-lib/lib/task';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function NewTask() {

    const navigate = useNavigate();

    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [priority, setPriority] = useState<Priority>(Priority.LOW);
    const [dueDate, setDueDate] = useState<Date | null>(new Date());

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.group('✅ Task Details');
        console.log(`🔥 Title: ${title}`);
        console.log(`📝 Description: ${description}`);
        console.log(`🔥 Priority: ${priority}`);
        console.log(`⌛️ Due Date: ${dueDate}`);
        console.groupEnd();
    };

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