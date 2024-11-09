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

export const TemperatureChart = ({ timeFilter, startDate, endDate, selectedPondId, setSelectedPondId }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const filterDataByTime = useCallback((data) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59); // Đảm bảo bao gồm toàn bộ ngày kết thúc
    
        let filteredData;
    
        switch (timeFilter) {
            case 'last_3_days':
                filteredData = data.filter(record => {
                    const recordDate = new Date(record.createdAt);
                    return (now - recordDate) <= (3 * 24 * 60 * 60 * 1000); // Lọc 3 ngày gần nhất
                });
                break;
            case 'last_week':
                filteredData = data.filter(record => {
                    const recordDate = new Date(record.createdAt);
                    return (now - recordDate) <= (7 * 24 * 60 * 60 * 1000); // Lọc 1 tuần gần nhất
                });
                break;
            case 'custom':
                if (startDate && endDate) {
                    filteredData = data.filter(record => {
                        const recordDate = new Date(record.createdAt);
                        return recordDate >= start && recordDate <= end; // Dùng end đã điều chỉnh
                    });
                } else {
                    filteredData = data; // Nếu không có ngày bắt đầu và kết thúc, không lọc
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

                    const formatDate = (dateString) => {
                        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                        return new Date(dateString).toLocaleDateString(undefined, options);
                    };

                    const labels = data.map(record => formatDate(record.createdAt));
                    const temperature = data.map(record => record.temperature);
                    const outdoorTemp = data.map(record => record.outdoorTemp);

                    setChartData({
                        labels: labels,
                        datasets: [{
                            label: "Indoor Temperature",
                            data: temperature,
                            borderColor: "orange",
                            backgroundColor: "orange",
                            yAxisID: "y-left",
                        },
                        {
                            label: "Outdoor Temperature",
                            data: outdoorTemp,
                            borderColor: "blue",
                            backgroundColor: "blue",
                            yAxisID: "y-left",
                        }
                    ],
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
                text: 'Pond Temperature',
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
                    text: "°C",
                },
            }
        },
    };

   

    if (loading) {
        return <div>Loading data...</div>; // Hiển thị "Loading..." trong khi dữ liệu đang được tải
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
                        borderWidth:3,
                        tension:0.4,
                        fill: true,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    }}>
                        <Line options={options} data={chartData} />
                    </div>
                ) : (
                    <div>No chart data available</div>
                )}
            </div>
        </div>
        )};
export default TemperatureChart;