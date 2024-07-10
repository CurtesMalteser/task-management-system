import { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import ROUTES from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import TitleFormGroup from './components/TitleFormGroup';
import DescriptionFormGroup from './components/DescriptionFormGroup';
import TaskDatePicker from './components/TaskDatePicker';

function NewTask() {

    const [dueDate, setDueDate] = useState<Date | null>(new Date());

    // {
    //     title: 'Task 6',
    //     description: 'Description 6',
    //     dueDate: 1721727000000,
    //     priority: Priority.HIGH,
    // }

    const navigate = useNavigate();

    return (
        <Container className="md-8">
            <h1>Hello New Task Component</h1>
            <Form /*onSubmit={handleSubmit}*/>
                <TitleFormGroup />
                <DescriptionFormGroup />
                <TaskDatePicker
                    selected={dueDate}
                    handleDateChange={setDueDate}
                />
                <>
                    <Button as="input"
                        type="submit"
                        variant="primary"
                        value="Save"
                        onClick={() => console.log(`⌛️ Due Date: ${dueDate}`)}
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