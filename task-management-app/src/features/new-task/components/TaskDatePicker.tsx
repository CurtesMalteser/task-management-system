import Form from 'react-bootstrap/esm/Form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface TaskDatePickerProps {
    selected: Date | null;
    handleDateChange: (date: Date | null) => void;
}

function TaskDatePicker({ selected, handleDateChange } : TaskDatePickerProps) {
    return (
        <Form.Group controlId="dueDate">
            <Form.Label className='me-2'>Due Date:</Form.Label>
            <DatePicker
                selected={selected}
                onChange={handleDateChange}
                showTimeSelect
                dateFormat="Pp"
                className="form-control"
            />
        </Form.Group>
    );
}

export default TaskDatePicker;