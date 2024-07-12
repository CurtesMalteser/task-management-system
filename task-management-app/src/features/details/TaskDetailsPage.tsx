import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';

function TaskDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();

    return (
        <div>
            <h1>Task Details</h1>
            <p>Task ID: {id}</p>
        </div>
    )

}

export default TaskDetailsPage;