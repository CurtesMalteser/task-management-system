import { useEffect } from "react";
import {
    HelmetProvider,
    Helmet,
} from "react-helmet-async";

interface ChartProps {
    data: (string | number)[][];
    title: string;
    header: (string | number)[];
}

function DashboardPie({ data, title, header }: ChartProps) {
    useEffect(() => {
        const google = (window as any).google;
        if (google && google.charts) {
            google.charts.load('current', { packages: ['corechart'] });
            google.charts.setOnLoadCallback(drawChart);
        }
        const handleResize = () => {
            drawChart();
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const drawChart = () => {
        const google = (window as any).google;
        const chartData = google.visualization.arrayToDataTable([header, ...data]);
        const options = { title, pieHole: 0.4};
        const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(chartData, options);
    };

      return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <script src="https://www.gstatic.com/charts/loader.js"></script>
                </Helmet>
                <div id="chart_div" style={{ width: '100%', height: '400px' }}></div>
            </div>
        </HelmetProvider>
    );
};

export default DashboardPie;