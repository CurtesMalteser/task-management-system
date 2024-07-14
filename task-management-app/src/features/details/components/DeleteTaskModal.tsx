import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface DeleteTaskModalProps {
    show: boolean;
    taskTitle: string;
    handleClose: () => void;
    handleDelete: () => void;
}

function DeleteTaskModal({ show, taskTitle, handleClose, handleDelete }: DeleteTaskModalProps) {


    return (

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete the following task?<br /><br />
                <b>{taskTitle}</b>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="danger" onClick={handleDelete}><b>Understood</b></Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteTaskModal;