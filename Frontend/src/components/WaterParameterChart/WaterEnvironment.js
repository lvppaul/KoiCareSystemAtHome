import { useState, useEffect, useCallback } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const WaterChart = ({ timeFilter, startDate, endDate, selectedPondId }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);


    // Hàm lọc dữ liệu dựa trên thời gian
    const filterDataByTime = useCallback((data) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);

        let filteredData;
        switch (timeFilter) {
            case 'last_3_days':
                filteredData = data.filter(record => {
                    const recordDate = new Date(record.createdAt);
                    return (now - recordDate) <= (3 * 24 * 60 * 60 * 1000);
                });
                break;
            case 'last_week':
                filteredData = data.filter(record => {
                    const recordDate = new Date(record.createdAt);
                    return (now - recordDate) <= (7 * 24 * 60 * 60 * 1000);
                });
                break;
            case 'custom':
                if (startDate && endDate) {
                    filteredData = data.filter(record => {
                        const recordDate = new Date(record.createdAt);
                        return recordDate >= start && recordDate <= end;
                    });
                } else {
                    filteredData = data;
                }
                break;
            default:
                filteredData = data;
        }
        return filteredData;
    }, [timeFilter, startDate, endDate]); 

    // Hàm lấy dữ liệu từ API
    useEffect(() => {
    const fetchData = async () => {
        if (selectedPondId) {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:7062/api/WaterParameter/WaterParameterByPondId/${selectedPondId}`);
                let data = await response.json();

                data = filterDataByTime(data);

                const formatDate = (dateString) => {
                    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    return new Date(dateString).toLocaleDateString(undefined, options);
                };

                const labels = data.map(record => formatDate(record.createdAt));
                const pH = data.map(record => record.ph);
                const GH = data.map(record => record.hardness);
                const KH = data.map(record => record.carbonHardness);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "pH",
                            data: pH,
                            borderColor: "orange",
                            backgroundColor: "orange",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        },
                        {
                            label: "GH",
                            data: GH,
                            borderColor: "green",
                            backgroundColor: "green",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-right",
                        },
                        {
                            label: "KH",
                            data: KH,
                            borderColor: "brown",
                            backgroundColor: "brown",
                            borderWidth:3,
                            tension:0.4,
                            fill: true,
                            yAxisID: "y-right",
                        },
                    ],
                });
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu từ API.", error);
            } finally {
                setLoading(false);
            }
        }
    };
        fetchData();
    }, [selectedPondId, timeFilter, startDate, endDate, filterDataByTime]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Pond Water Quality',
            },
        },
        scales: {
            "y-left": {
                type: "linear",
                display: true,
                position: "left",
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    stepSize: 10,
                },
                title: {
                    display: true,
                    text: "pH",
                },
            },
            "y-right": {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                    stepSize: 1,
                },
                title: {
                    display: true,
                    text: "°dH",
                },
            },
        },
    };


    if (loading) {
        return <div>Loading data...</div>;
    }

    return (
        <div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                {chartData ? (
                    <div style={{
                        width: '80%',
                        height: '40%',
                        maxHeight: '1080px',
                        maxWidth: '1920px',
                        border: '2px solid #ccc',
                        borderRadius: '10px',
                        backgroundColor: '#fff',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <Line options={options} data={chartData} />
                    </div>
                ) : (
                    <div>No chart data available</div>
                )}
            </div>
        </div>
    );
};

export default WaterChart;
