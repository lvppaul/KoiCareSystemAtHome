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

export const SaltChart = ({ timeFilter, startDate, endDate, selectedPondId, setSelectedPondId }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric'};
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
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

    useEffect(() => {
        const fetchData = async () =>{
            if(selectedPondId){
                setLoading(true);
                try{
                    
                    const response = await fetch(`https://localhost:7062/api/WaterParameter/WaterParameterByPondId/${selectedPondId}`);
                    let data = await response.json();

                    data = filterDataByTime(data);
                    
                    const labels = data.map(record => {
                        const date = new Date(record.createdAt);
                        return formatDate(date); // Hoặc sử dụng định dạng khác nếu cần
                    });
                    const salt = data.map(record => record.salt);

                    setChartData({
                        labels: labels,
                        datasets: [{
                            label: "%",
                            data: salt,
                            borderColor: "yellow",
                            backgroundColor: "yellow",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        }],
                    });
                } catch (error){
                    console.error("Lỗi khi lấy dữ liệu từ API.", error);
                } finally{
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
                text: 'Water Parameter Salt',
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
                    text: "%",
                },
            }
        },
    };

    if (loading) {
        return <div>Loading data...</div>; // Hiển thị "Loading..." trong khi dữ liệu đang được tải
    }

    return (
        <div>
            {/* Kiểm tra nếu chartData là null hoặc rỗng */}
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