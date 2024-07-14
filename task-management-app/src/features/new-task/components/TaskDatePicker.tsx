import Form from 'react-bootstrap/esm/Form';

interface TaskDatePickerProps {
    selected: Date | null;
    handleDateChange: (date: Date | null) => void;
}

function TaskDatePicker({ selected, handleDateChange }: TaskDatePickerProps) {
    return (
        <Form.Group className="d-flex align-items-center" controlId="taskForm.DueDate">
            <Form.Label className="me-2">Due Date:</Form.Label>
            <span className="d-flex align-items-center">
                <Form.Control
                    type="date"
                    name="dueDate"
                    placeholder="Due date"
                    value={selected?.toISOString().split('T')[0]}
                    onChange={(e) => handleDateChange(new Date(e.target.value))}
                />
            </span>
        </Form.Group>
    );
}

export default TaskDatePicker;