import Form from 'react-bootstrap/esm/Form';
import { TextInputProps } from './inputProps';

function DescriptionFormGroup({ value, onChange }: TextInputProps) {
    return (
        <Form.Group className="mb-3" controlId="taskForm.DescriptionTextArea">
            <Form.Label>Description:</Form.Label>
            <Form.Control type="text"
                as="textarea"
                rows={3}
                placeholder="Please describe the task."
                required
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onInvalid={(e) => { e.currentTarget.setCustomValidity('Please fill the Task Description.') }}
                onInput={(e) => { e.currentTarget.setCustomValidity('') }}
            />
            <Form.Control.Feedback type="invalid">
                <>
                    Please describe the task in detail.<br />
                    Include important information such as the objective, any specific requirements, and the expected outcome.<br />
                </>
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Great! Your Task description looks good.</Form.Control.Feedback>
        </Form.Group>
    )
}

export default DescriptionFormGroup;