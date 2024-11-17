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

export const WaterChemistryChart = ({ timeFilter, startDate, endDate, selectedPondId, setSelectedPondId }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const [pondList, setPondList] = useState([]);


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
    const fetchData = async () => {
        if (selectedPondId) {
            setLoading(true);
            try {
                const response = await fetch(`https://localhost:7062/api/WaterParameter/WaterParameterByPondId/${selectedPondId}`);
                let data = await response.json();

                // Lọc dữ liệu theo khoảng thời gian
                data = filterDataByTime(data);

                const formatDate = (dateString) => {
                    const options = { year: 'numeric', month: 'long', day: 'numeric'};
                    return new Date(dateString).toLocaleDateString(undefined, options);
                };

                const labels = data.map(record => formatDate(record.createdAt));
                const AmountFed = data.map(record => record.amountFed);
                const Nitrite = data.map(record => record.nitrite);
                const Nitrate = data.map(record => record.nitrate);
                const Ammonium = data.map(record => record.ammonium);
                const Phosphate = data.map(record => record.phosphate);
                const Oxygen = data.map(record => record.oxygen);
                const CarbonDioxide = data.map(record => record.carbonDioxide);
                const TotalChlorine = data.map(record => record.totalChlorines);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Amount Fed",
                            data: AmountFed,
                            borderColor: "#BFFF00",
                            backgroundColor: "#BFFF00",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-right",
                        },
                        {
                            label: "Nitrite",
                            data: Nitrite,
                            borderColor: "#FF0000",
                            backgroundColor: "#FF0000",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        },
                        {
                            label: "Nitrate",
                            data: Nitrate,
                            borderColor: "#800080",
                            backgroundColor: "#800080",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        },
                        {
                            label: "Ammonium",
                            data: Ammonium,
                            borderColor: "#FF7F00",
                            backgroundColor: "#FF7F00",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        },
                        {
                            label: "Phosphate",
                            data: Phosphate,
                            borderColor: "#004F00",
                            backgroundColor: "#004F00",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        },
                        {
                            label: "Oxygen",
                            data: Oxygen,
                            borderColor: "#00BFFF",
                            backgroundColor: "#00BFFF",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        },
                        {
                            label: "CO₂",
                            data: CarbonDioxide,
                            borderColor: "#808080",
                            backgroundColor: "#808080",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
                        },
                        {
                            label: "Total Chlorines",
                            data: TotalChlorine,
                            borderColor: "Gold",
                            backgroundColor: "Gold",
                            borderWidth:3,
                        tension:0.4,
                        fill: true,
                            yAxisID: "y-left",
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
                text: 'Pond Water Chemistry Quality',
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
                    text: "mg/l",
                    font: {
                        size: 14,
                        weight: 'bold',
                    }
                },
            },
            "y-right": {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                    stepSize: 2000,
                },
                title: {
                    display: true,
                    text: "g",
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
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
                        padding: '10px',
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
export default WaterChemistryChart;