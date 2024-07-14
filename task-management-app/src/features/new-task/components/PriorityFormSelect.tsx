import Form from "react-bootstrap/esm/Form";
import { Priority } from "task-management-lib/lib/task";

interface PriorityFormSelectProps {
    value: Priority;
    onChange: (priority: Priority) => void;
}

function PriorityFormSelect({ value, onChange }: PriorityFormSelectProps) {
    return (
        <Form.Group className="d-flex align-items-center" controlId="taskForm.Priority">
            <Form.Label className="me-2">Priority:</Form.Label>
            <Form.Select
                value={value}
                onChange={(e) => onChange(e.target.value as Priority)}
            >
                <option value={Priority.LOW}>Low</option>
                <option value={Priority.MEDIUM}>Medium</option>
                <option value={Priority.HIGH}>High</option>
            </Form.Select>
        </Form.Group>
    );
}

export default PriorityFormSelect;