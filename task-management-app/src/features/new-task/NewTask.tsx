import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/esm/Form';
import ROUTES from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import TitleFormGroup from './components/TitleFormGroup';
import DescriptionFormGroup from './components/DescriptionFormGroup';

function NewTask() {

    const navigate = useNavigate();

    return (
        <Container className="md-8">
            <h1>Hello New Task Component</h1>
            <Form /*onSubmit={handleSubmit}*/>
                <TitleFormGroup />
                <DescriptionFormGroup />
                <>
                    <Button as="input" type="submit" variant="primary" value="Save" />{' '}
                    <Button as="input" type="button" variant='outline-primary' value="Cancel" onClick={() => navigate(ROUTES.HOME)} />
                </>
            </Form>
        </Container>
    );
}

export default NewTask;