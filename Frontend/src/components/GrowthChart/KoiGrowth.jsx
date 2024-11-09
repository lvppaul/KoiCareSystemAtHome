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
    Legend
} from 'chart.js';
import { Col, Row } from "react-bootstrap";
import { getKoiByUserId } from "../../Config/KoiApi";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const KoiGrowthChart = ({ userId }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [koiList, setKoiList] = useState([]); // Danh sách các con cá
    const [selectedKoiId, setSelectedKoiId] = useState(null); // ID cá đã chọn
    const [timeFilter, setTimeFilter] = useState("last_3_days");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const handleTimeFilterChange = (e) => {
        setTimeFilter(e.target.value);
    };

    // Lấy danh sách các con cá
    useEffect(() => {
        const fetchKoiList = async () => {
            try {
                console.log("Fetching Koi List...");
                const response = await getKoiByUserId(userId);
                setKoiList(response);
                if (response.length > 0) {
                    setSelectedKoiId(response[0].koiId); // Chọn con cá đầu tiên làm mặc định
                }
                setLoading(false); // Dừng trạng thái loading khi dữ liệu được lấy
            } catch (error) {
                console.error("Lỗi khi lấy danh sách cá:", error);
                setLoading(false); // Đặt loading thành false khi có lỗi
            }
        };
        fetchKoiList();
    }, [userId]);

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
                    const recordDate = new Date(record.updatedTime);
                    return (now - recordDate) <= (3 * 24 * 60 * 60 * 1000);
                });
                break;
            case 'last_week':
                filteredData = data.filter(record => {
                    const recordDate = new Date(record.updatedTime);
                    return (now - recordDate) <= (7 * 24 * 60 * 60 * 1000);
                });
                break;
            case 'custom':
                if (startDate && endDate) {
                    filteredData = data.filter(record => {
                        const recordDate = new Date(record.updatedTime);
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
        const fetchData = async () => {
            if (selectedKoiId) {
                setLoading(true);
                console.log("Fetching Data for Koi ID:", selectedKoiId); // Hiển thị ID cá đang chọn
                try {
                    const response = await fetch(`https://localhost:7062/api/KoiRecord/GetKoiRecordByKoiId/${selectedKoiId}`);
                    if (!response.ok) throw new Error("Không thể lấy dữ liệu cá");
                    let data = await response.json();

                    data = filterDataByTime(data);

                    const formatDate = (dateString) => {
                        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                        return new Date(dateString).toLocaleDateString(undefined, options);
                    };
                    const labels = data.map(record => formatDate(record.updatedTime));
                    const weightData = data.map(record => record.weight);
                    const lengthData = data.map(record => record.length);

                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "Weight (kg)",
                                data: weightData,
                                borderColor: "rgb(75, 192, 192)",
                                backgroundColor: "rgb(75, 192, 192)",
                                yAxisID: "y-right",
                            },
                            {
                                label: "Length (cm)",
                                data: lengthData,
                                borderColor: "red",
                                backgroundColor: "red",
                                yAxisID: "y-left",
                            },
                        ],
                    });
                } catch (error) {
                    console.error("Lỗi khi lấy dữ liệu từ API:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [selectedKoiId, timeFilter, startDate, endDate, filterDataByTime]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Koi Growth Over Time',
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
                    stepSize: 2,
                },
                title: {
                    display: true,
                    text: "Length (cm)",
                },
            },
            "y-right": {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                    stepSize: 0.1,
                },
                title: {
                    display: true,
                    text: "Kilogram (kg)",
                },
            },
        },
    };

    const handleKoiChange = (e) => {
        setSelectedKoiId(e.target.value);
    };

    if (loading) {
        return <div>Loading data...</div>;
    }

    return (
        <>
            <div>
                {/* Bộ lọc thời gian */}
                <Row style={{ padding: '20px' }}>
                    <Col>
                        <label>Choose time:</label>
                        <select
                            onChange={handleTimeFilterChange}
                            value={timeFilter}
                            style={{ background: "orange", color: "white", padding: "10px", borderRadius:"10px" }}
                        >
                            <option value="last_3_days">3 Latest Days</option>
                            <option value="last_week">Last Week</option>
                            <option value="custom">Custom time</option>
                        </select>

                        {timeFilter === "custom" && (
                            <div>
                                <input
                                    type="date"
                                    onChange={(e) => setStartDate(e.target.value)}
                                    value={startDate}
                                />
                                <input
                                    type="date"
                                    onChange={(e) => setEndDate(e.target.value)}
                                    value={endDate}
                                />
                            </div>
                        )}
                    </Col>
                    <Col>
                        <label>Select koi fish:</label>
                        {console.log("Koi List:", koiList)}
                        <select style={{ background: "orange", color: "white", padding: '10px' , borderRadius:"10px" }} onChange={handleKoiChange} value={selectedKoiId}>
                            {koiList.map(koi => (
                                <option key={koi.koiId} value={koi.koiId}>
                                    {koi.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                </Row>
            </div>
            <div style={{ display: 'flex' }}>
                {/* Kiểm tra nếu chartData là null hoặc rỗng */}
                {chartData ? (
                    <div style={{
                        width: '900px',
                        height: '500px',
                        border: '2px solid #ccc',  // Thêm viền
                        borderRadius: '10px',      // Bo góc
                        padding: '10px',           // Thêm khoảng trống bên trong
                        backgroundColor: '#fff',// Màu nền cho phần chứa biểu đồ
                        borderWidth:3,
                        tension:0.4,
                        fill: true,   
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                    }}>
                        <Line options={options} data={chartData} />
                    </div>
                ) : (
                    <div>No chart data available</div>
                )}
            </div>
        </>
    );
};
export default KoiGrowthChart;
