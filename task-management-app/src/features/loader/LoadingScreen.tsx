import { Card, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './LoadingScreen.css';

const LoadingScreen = () => (
    <div className='loading-screen-container'>
        <Container className="md-6 d-flex justify-content-center">
            <Card>
                <Card.Body className='loading-screen-body'>
                    <Spinner
                        animation="border"
                        variant="primary"
                        className='mb-3'
                    />
                    <Card.Title>Loading...</Card.Title>
                </Card.Body>
            </Card>
        </Container>
    </div>
);

export default LoadingScreen;