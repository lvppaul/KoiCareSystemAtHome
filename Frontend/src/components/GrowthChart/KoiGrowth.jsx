import React, { useState, useEffect, useCallback } from 'react';
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
import { getKoiById, getKoiRecord, GetKoiRecordByKoiId, getSampleKoiRecord } from "../../Config/KoiApi";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const KoiGrowthChart = ({ koiDetail }) => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState('all_time');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleTimeFilterChange = (e) => {
        setTimeFilter(e.target.value);
    };

    // Hàm lọc dữ liệu dựa trên thời gian
    const filterDataByTime = useCallback((data) => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59);

        let filteredData;
        switch (timeFilter) {
            case '1 month':
                filteredData = data.filter(record => {
                    const recordDate = new Date(record.updatedTime);
                    return recordDate >= new Date(now.setMonth(now.getMonth() - 1));
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
            if (koiDetail && koiDetail.koiId) {
                setLoading(true);
                try {
                    const response = await GetKoiRecordByKoiId(koiDetail.koiId);
                    let data = await response;
                    data.sort((a, b) => new Date(a.updatedTime) - new Date(b.updatedTime));
                    data = filterDataByTime(data);
    
                    const formatDate = (dateString) => {
                        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
                        return new Date(dateString).toLocaleDateString('en-GB', options);
                    };
    
                    const labels = data.map(record => formatDate(record.updatedTime));
                    const weightData = data.map(record => record.weight);
                    const lengthData = data.map(record => record.length);
    
                    // Lấy dữ liệu mẫu (Sample Data)
                    const sampleStart = await getSampleKoiRecord(koiDetail.age - 1);
                    const sampleEnd = await getSampleKoiRecord(koiDetail.age);
    
                    const interpolate = (startValue, endValue, numSteps) => {
                        const step = (endValue - startValue) / (numSteps - 1);
                        return Array.from({ length: numSteps }, (_, i) => startValue + i * step);
                    };

                    const sampleWeightData = interpolate(
                        sampleStart.weight,
                        sampleEnd.weight,
                        labels.length
                    );
    
                    const sampleLengthData = interpolate(
                        sampleStart.length,
                        sampleEnd.length,
                        labels.length
                    );
    
                    // Kết hợp dữ liệu
                    setChartData({
                        labels: labels,
                        datasets: [
                            {
                                label: "Weight (gram)",
                                data: weightData,
                                borderColor: "rgb(25, 205, 25)",
                                borderWidth:3,
                                tension:0.4,
                                fill: true,
                                yAxisID: "y-left", // Gán vào trục y-left

                            },
                            {
                                label: "Length (cm)",
                                data: lengthData,
                                borderColor: "rgb(160, 160, 255)",
                                borderWidth:3,
                                tension:0.4,
                                fill: true,
                                yAxisID: "y-right", // Gán vào trục y-right

                            },
                            {
                                label: "Expected Weight (gram)",
                                data: sampleWeightData,
                                borderColor: "rgba(25, 105, 25, 0.7)",
                                borderDash: [5, 5],
                                borderWidth:3,
                                tension:0.4,
                                fill: true,
                                yAxisID: "y-left", // Gán vào trục y-left

                            },
                            {
                                label: "Expected Length (cm)",
                                data: sampleLengthData,
                                borderColor: "rgba(25, 25, 100, 0.7)",
                                borderDash: [5, 5],
                                borderWidth:3,
                                tension:0.4,
                                fill: true,
                                yAxisID: "y-right", // Gán vào trục y-right

                            },
                        ],
                    });
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            }
        };
    
        fetchData();
    }, [koiDetail, timeFilter, startDate, endDate, filterDataByTime]);
    
    
    
    
        

    if (!koiDetail) {
        return <div>No koi detail available</div>;
    }

    if (loading) {
        return <div>Loading data...</div>;
    }

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
                    stepSize: 100,
                },
                title: {
                    display: true,
                    text: "Gram (g)",
                },
            },
            "y-right": {
                type: "linear",
                display: true,
                position: "right",
                ticks: {
                    stepSize: 2,
                },
                title: {
                    display: true,
                    text: "Length (cm)",
                },
            },
        },
    };
    return (
        <>
            <div>
                <Row style={{ padding: '20px' }}>
                    <Col>
                        <h3><strong>{koiDetail.name}</strong></h3>
                    </Col>
                    <Col>
                        <label>Choose time: </label>
                        <select
                            onChange={handleTimeFilterChange}
                            value={timeFilter}
                            style={{ background: "orange", color: "white", padding: "10px", borderRadius:"10px" }}
                        >
                            <option value="">All time</option>
                            <option value="1 month">1 Month</option>
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
                </Row>
            </div>
            <div style={{ display: 'flex' }}>
                {chartData ? (
                    <div style={{
                        width: '900px',
                        height: '500px',
                        border: '2px solid #ccc',
                        borderRadius: '10px',
                        padding: '10px',
                        backgroundColor: '#fff',
                        
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
