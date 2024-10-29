import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import WaterChart from './WaterEnvironment'; // Ensure the path is correct
import WaterChemistryChart from './WaterChemistryChart'; // Ensure the path is correct
import TemperatureChart from './Temperature'; // Ensure the path is correct if needed
import { SaltChart } from './SaltChart';
import { Col, Container, Row } from 'react-bootstrap';
import { getPondsById } from '../../Config/PondApi';

const CombinedCharts = ({ pondId }) => {
    const [timeFilter, setTimeFilter] = useState("last_3_days");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedPondId, setSelectedPondId] = useState("");
    const [selectedChart, setSelectedChart] = useState("water");

    useEffect(() => {
        const fetchPond = async () => {
            try {
                const response = await getPondsById(pondId);
                setSelectedPondId(response);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách hồ:", error);
            }
        };
        fetchPond();
    }, [pondId]);

    const handleTimeFilterChange = (e) => {
        setTimeFilter(e.target.value);
    };


    return (
        <Container>
            <Row style={{padding:"20px"}}>
                <Col xs={6} sm={3}  md={3} lg={3} xl={3}>
                    <label>Choose Time Filter:</label>
                </Col>
                <Col xs={6} sm={3}  md={3} lg={3} xl={3}>
                    <select
                        onChange={handleTimeFilterChange}
                        value={timeFilter}
                        style={{ background: "orange", color: "white", padding:"10px", borderRadius:"10px" }}
                    >
                        <option value="last_3_days">3 ngày gần nhất</option>
                        <option value="last_week">Tuần vừa qua</option>
                        <option value="custom">Tùy chỉnh</option>
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
            <Row>
                <Col xs={12}>
                    <select
                        style={{ background: "orange", color: "white", display: "block", margin: "20px auto", padding: 10 , borderRadius:"10px"}}
                        onChange={(e) => setSelectedChart(e.target.value)}
                        value={selectedChart}
                    >
                        <option value="water">Water Chart</option>
                        <option value="chemistry">Water Chemistry Chart</option>
                        <option value="salt">Salt Chart</option>
                        <option value="temperature">Temperature Chart</option>
                    </select>
                </Col>
            </Row>
            <Row>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {selectedChart === "water" && (
                            <div style={{ width: '100%', height: '100%' }}>
                                <WaterChart pondId={pondId} 
                                timeFilter={timeFilter} 
                                startDate={startDate} 
                                endDate={endDate} 
                                selectedPondId={pondId} />
                            </div>
                        )}
                        {selectedChart === "chemistry" && (
                            <div style={{ width: '100%', height: '400px' }}>
                                <WaterChemistryChart pondId={pondId} 
                                timeFilter={timeFilter} 
                                startDate={startDate} 
                                endDate={endDate} 
                                selectedPondId={pondId} />
                            </div>
                        )}
                        {selectedChart === "salt" && (
                            <div style={{ width: '100%', height: '400px' }}>
                                <SaltChart 
                                timeFilter={timeFilter} 
                                startDate={startDate} 
                                endDate={endDate} 
                                selectedPondId={pondId} />
                            </div>
                        )}
                        {selectedChart === "temperature" && (
                            <div style={{ width: '100%', height: '400px' }}>
                                <TemperatureChart  
                                timeFilter={timeFilter} 
                                startDate={startDate} 
                                endDate={endDate} 
                                selectedPondId={pondId} />
                            </div>
                        )}
                    </div>
            </Row>
        </Container>
    );
};

export default CombinedCharts;
