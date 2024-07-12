import { ReactComponent as HighPriorityIcon } from '../assets/svg/arrow-up.svg';
import { ReactComponent as MediumPriorityIcon } from '../assets/svg/equal-sign.svg';
import { ReactComponent as LowPriorityIcon } from '../assets/svg/arrow-down.svg';
import { Priority, Status } from 'task-management-lib/lib/task';
import Badge from 'react-bootstrap/esm/Badge';

export const PriorityIcon: React.FC<Priority> = (priority) => {
  switch (priority) {
    case Priority.HIGH:
      return <HighPriorityIcon className='priority-icon' color="#DC143C" title="High Priority" />;
    case Priority.MEDIUM:
      return <MediumPriorityIcon className='priority-icon' color="#FF8C00" title="Medium Priority" />;
    case Priority.LOW:
      return <LowPriorityIcon className='priority-icon' color="#4CAF50" title="Low Priority" />;
    default:
      return null;
  }
};

export const StatusBadge: React.FC<Status> = (status) => {
  switch (status) {
    case Status.OPEN:
      return <Badge pill bg="primary">TO DO</Badge>;
    case Status.IN_PROGRESS:
      return <Badge pill bg="warning" text="dark">IN PROGRESS</Badge>;
    case Status.COMPLETED:
      return <Badge pill bg="success">DONE</Badge>;
    default:
      return null;
  }

}