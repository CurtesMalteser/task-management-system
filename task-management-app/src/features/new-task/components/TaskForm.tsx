
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Priority } from 'task-management-lib/lib/task';
import TitleFormGroup from './TitleFormGroup';
import DescriptionFormGroup from './DescriptionFormGroup';
import PriorityFormSelect from './PriorityFormSelect';
import TaskDatePicker from './TaskDatePicker';

export interface TaskFormProps {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    priority: Priority;
    setPriority: (priority: Priority) => void;
    dueDate: Date | null;
    setDueDate: (date: Date | null) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    handleCancel: () => void;
}

function TaskForm({
    title,
    setTitle,
    description,
    setDescription,
    priority,
    setPriority,
    dueDate,
    setDueDate,
    handleSubmit,
    handleCancel,
}: TaskFormProps) {
    return (
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
                    onClick={handleCancel}
                />
            </>
        </Form>
    );
}

export default TaskForm;