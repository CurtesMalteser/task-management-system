import Container from "react-bootstrap/esm/Container";
import useTaskStatistics from "./tasksStatistics";
import DashboardCards from "./components/DashboardCards";


function DashboardPage() {

    const statistics = useTaskStatistics();

    return (
        <Container>
            <h1>Dashboard</h1>
            <DashboardCards statistics={statistics}
            />
        </Container>
    );
}

export default DashboardPage;