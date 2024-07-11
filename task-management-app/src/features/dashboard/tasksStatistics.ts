import { useAppSelector } from '../../app/hooks';
import {
    completedTasksSelector,
    inProgressTasksSelector,
    overdueTasksSelector,
} from '../../features/tasks-list/tasksSlice';

export interface TaskStatistics {
    completedTasksCount: number;
    inProgressTasksCount: number;
    overdueTasksCount: number;
}

function useTaskStatistics(): TaskStatistics {
    const completedTasksCount = useAppSelector(completedTasksSelector).length;
    const inProgressTasksCount = useAppSelector(inProgressTasksSelector).length;
    const overdueTasksCount = useAppSelector(overdueTasksSelector).length;

    return { completedTasksCount, inProgressTasksCount, overdueTasksCount };
};

export default useTaskStatistics;