import { useEffect, useState } from "react";
import {
    HelmetProvider,
    Helmet,
} from "react-helmet-async";
import { isDarkModeSelector } from '../../../features/dark-mode/darkModeSlice';
import { useAppSelector } from "../../../app/hooks";

const useScript = (src: string) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => setLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [src]);

    return loaded;
};

interface ChartProps {
    data: (string | number)[][];
    title: string;
    header: (string | number)[];
}

function DashboardPie({ data, title, header }: ChartProps) {

    const isDarkMode = useAppSelector(isDarkModeSelector)
    const scriptLoaded = useScript('https://www.gstatic.com/charts/loader.js');

    useEffect(() => {
        const handleResize = () => {
            drawChart();
        };

        if (scriptLoaded) {
            const google = (window as any).google;
            if (google && google.charts) {
                google.charts.load('current', { packages: ['corechart'] });
                google.charts.setOnLoadCallback(drawChart);
            }


            window.addEventListener('resize', handleResize);
        }

        return () => window.removeEventListener('resize', handleResize);
    }, [scriptLoaded, isDarkMode]);

    const drawChart = () => {
        const google = (window as any).google;
        const chartData = google.visualization.arrayToDataTable([header, ...data]);
        const options = { title, pieHole: 0.4,
            backgroundColor: isDarkMode ? '#333' : '#fff',
            titleTextStyle: { color: isDarkMode ? '#fff' : '#000' },
            legendTextStyle: { color: isDarkMode ? '#fff' : '#000' },
            pieSliceTextStyle: { color: isDarkMode ? '#fff' : '#000' },
        };
        const chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(chartData, options);
    };

    return (
        <HelmetProvider>
            <div>
                <Helmet>
                    <script src="https://www.gstatic.com/charts/loader.js"></script>
                </Helmet>
                <div id="chart_div" style={{ width: '100%', height: '400px'}} />
            </div>
        </HelmetProvider>
    );
};

export default DashboardPie;