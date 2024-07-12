import Container from "react-bootstrap/esm/Container";
import useTaskStatistics from "./tasksStatistics";
import DashboardCards from "./components/DashboardCards";
import DashboardPie from "./components/DashboardPie";


function DashboardPage() {

    const statistics = useTaskStatistics();

    return (
        <Container>
            <h1>Dashboard</h1>
            <DashboardCards statistics={statistics} />
            <DashboardPie
                title="Overview"
                header={['Status', 'Count']}
                data={[
                    ['Completed', statistics.completedTasksCount],
                    ['In Progress', statistics.inProgressTasksCount],
                    ['Overdue', statistics.overdueTasksCount],
                ]}
            />
        </Container>
    );
}

export default DashboardPage;