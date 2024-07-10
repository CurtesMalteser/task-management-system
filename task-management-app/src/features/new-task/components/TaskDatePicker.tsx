import Form from 'react-bootstrap/esm/Form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function TaskDatePicker({ selected, handleDateChange } : { selected: Date | null, handleDateChange: (date: Date | null) => void }) {
    return (
        <Form.Group controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
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