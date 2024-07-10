import Form from 'react-bootstrap/esm/Form';

function TitleFormGroup() {
    return (
        <Form.Group className="mb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control type="text"
                placeholder="Please fill in the task title."
                required
                onInvalid={(e) => { e.currentTarget.setCustomValidity('Please fill the Task Title.') }}
                onInput={(e) => { e.currentTarget.setCustomValidity('') }}
            />
            <Form.Control.Feedback type="invalid">
                <>
                    Please fill in the task title.<br />
                    Make sure it is concise and clearly represents the main objective of the task.<br />
                </>
            </Form.Control.Feedback>
            <Form.Control.Feedback type="valid">Great! Your Task title looks good.</Form.Control.Feedback>
        </Form.Group>
    )

}

export default TitleFormGroup;