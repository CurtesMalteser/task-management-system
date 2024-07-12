import { ReactComponent as HighPriorityIcon } from '../assets/svg/arrow-up.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/svg/equal-sign.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/svg/arrow-down.svg';
import { Priority } from 'task-management-lib/lib/task';

export const getPriorityIcon = (priority: Priority) => {
    switch (priority) {
      case Priority.HIGH:
        return <HighPriorityIcon color="#DC143C" title="High Priority" />;
      case Priority.MEDIUM:
        return <MediumPriorityIcon color="#FF8C00" title="Medium Priority" />;
      case Priority.LOW:
        return <LowPriorityIcon color="#4CAF50" title="Low Priority" />;
      default:
        return null;
    }
};