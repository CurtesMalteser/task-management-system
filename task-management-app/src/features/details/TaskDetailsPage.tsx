import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import {
    fetchTaskAsync,
    statusSelector,
    taskSelector,
} from './taskDetailsSlice';
import { Status } from '../../constants/Status';

function TaskDetailsPage() {

    const { id } = useParams<{ id: string }>();

    const dispatch = useAppDispatch();
    const task = useAppSelector(taskSelector);
    const status = useAppSelector(statusSelector);

    useEffect(() => {
        if (id) dispatch(fetchTaskAsync(id));
    }, [dispatch, id]);

    if (status === Status.LOADING) return <div>Loading...</div>;
    if (status === Status.FAILED) return <div>Failed to load task</div>;

    return (
        <div>
            <h1>Task Details</h1>
            {task && Object.keys(task).map((key, index) => (
                <div key={key}>
                    <span>{key}: </span>
                    <span>{Object.values(task)[index]}</span>
                </div>  
            ))}
        </div>
    )

}

export default TaskDetailsPage;