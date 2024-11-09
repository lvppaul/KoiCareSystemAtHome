import { Card, Button, Modal, Row, Col, Container } from 'react-bootstrap';
import AddWaterParameter from '../AddWaterParameter/AddWaterParameter';
import { useEffect, useState } from 'react';
import { getWaterParameter, checkWaterParameter, getWaterParameterAdvice } from '../../Config/WaterParameterApi.jsx';
import CombinedCharts from '../WaterParameterChart/CombinedCharts.js';
import DeleteWaterParameter from '../DeleteWaterParameter/DeleteWaterParameter.jsx';
import {useAuth} from '../../pages/Login/AuthProvider';
import { BiSolidAlarmExclamation, BiSolidLike } from 'react-icons/bi';

const WaterParameter = ({ show, setShow, pondId }) => {
    const [showAddWaterParameter, setShowAddWaterParameter] = useState(false);
    const [waterParameter, setWaterParameter] = useState([]);
    const [lastestWaterParameter, setLastestWaterParameter] = useState(null);
    const [warning, setWarning] = useState(null);
    const [advice, setAdvice] = useState(null);
    const userId = useAuth().user.userId;
    const [showGetAdvice, setShowGetAdvice] = useState(false);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    useEffect(() => {
        const fetchWaterParameter = () => {
        try {
            getWaterParameter(pondId)
                .then(data => {
                    setWaterParameter(data);
                    const sortedData = data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
                    setLastestWaterParameter(sortedData.length > 0 ? sortedData[0] : null);
                })
                .catch(error => console.error('Error fetching water parameter:', error));
        } catch (error) {
            console.error('Error fetching water parameter:', error);
        }
    };
    fetchWaterParameter();

    }, [pondId]);
        
    useEffect(() => {
        if (lastestWaterParameter) {
            checkLatestWaterParameter(lastestWaterParameter);
            getAdvice(lastestWaterParameter);
        } else {
            setWarning(null);
            setAdvice(null);
        }
    }, [lastestWaterParameter]);

    const handleAddWaterParameter = (newWaterParameter) => {
        setWaterParameter(prevParams => [...prevParams, newWaterParameter]);
        getWaterParameter(pondId)
        .then(data => {
            setWaterParameter(data);
            const sortedData = data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
            setLastestWaterParameter(sortedData.length > 0 ? sortedData[0] : null);
        })
    };

    const handleDeleteWaterData = (measureId) => {
        setWaterParameter(waterParameter.filter((parameter) => parameter.measureId !== measureId));
        getWaterParameter(pondId)
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
            setLastestWaterParameter(sortedData.length > 0 ? sortedData[0] : null);
        })
    };


    const checkLatestWaterParameter = async (lastestWaterParameter) => {
            try{
                const waterData = {
                    userId: userId,
                    pondId: pondId, 
                    ph: lastestWaterParameter.ph, 
                    oxygen: lastestWaterParameter.oxygen, 
                    nitrite: lastestWaterParameter.nitrite, 
                    nitrate: lastestWaterParameter.nitrate, 
                    temperature: lastestWaterParameter.temperature, 
                    salt: lastestWaterParameter.salt, 
                    ammonium: lastestWaterParameter.ammonium, 
                    phosphate: lastestWaterParameter.phosphate, 
                    hardness: lastestWaterParameter.hardness, 
                    carbonDioxide: lastestWaterParameter.carbonDioxide, 
                    carbonHardness: lastestWaterParameter.carbonHardness, 
                    totalChlorines: lastestWaterParameter.totalChlorines, 
                    outdoorTemp: lastestWaterParameter.outdoorTemp, 
                    amountFed: lastestWaterParameter.amountFed};
                const response = await checkWaterParameter(waterData);
                if (response){
                    setWarning(response);
                }
            } catch (error){
                console.log('error', error)
            }
    }

    const getAdvice = async (lastestWaterParameter) => {
        try{
            const waterData = {
                userId: userId,
                pondId: pondId, 
                ph: lastestWaterParameter.ph, 
                oxygen: lastestWaterParameter.oxygen, 
                nitrite: lastestWaterParameter.nitrite, 
                nitrate: lastestWaterParameter.nitrate, 
                temperature: lastestWaterParameter.temperature, 
                salt: lastestWaterParameter.salt, 
                ammonium: lastestWaterParameter.ammonium, 
                phosphate: lastestWaterParameter.phosphate, 
                hardness: lastestWaterParameter.hardness, 
                carbonDioxide: lastestWaterParameter.carbonDioxide, 
                carbonHardness: lastestWaterParameter.carbonHardness, 
                totalChlorines: lastestWaterParameter.totalChlorines, 
                outdoorTemp: lastestWaterParameter.outdoorTemp, 
                amountFed: lastestWaterParameter.amountFed};
            const response = await getWaterParameterAdvice(waterData);
            if (response){
                setAdvice(response);
                console.log('advice', response)
            }
        } catch (error){
            console.log('error', error)
        }
    }
    return (
        <>
            {warning ? (
                    <div style={{ backgroundColor: '#ffcccb', padding: '10px', borderRadius: '10px', marginBottom:'20px' }}>
                        <Card.Header>
                            <h4>Warnings <BiSolidAlarmExclamation size={30} color='red'/></h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <ul >
                                        {warning.map((warn, index) => (
                                            <li style={{fontSize:'20'}} key={index}>{warn}</li>
                                        ))}
                                    </ul>
                                </Col>
                            </Row>
                                {advice ? (
                                <Row 
                                style={{display:'flex', justifyContent:'flex-end', marginInlineEnd:'20px'}}>
                                    <Button variant='danger' style={{fontSize:'20px', fontWeight:'bold', width:'200px', height:'60px' }} onClick={() => setShowGetAdvice(true)}>Get Advice <BiSolidLike size={25}/></Button>
                                </Row>
                                ) : null}
                        </Card.Body>
                    </div>
            ) : null}
            {console.log('advice', advice)}
            {lastestWaterParameter ? (
                <Card as={Button}
                    style={{ display: 'flex', padding: '10px', borderRadius: '10px', border: '0.5 solid black', transition: 'background-color 0.3s' }}
                    onClick={() => setShow(true)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8433'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                    <Card.Header style={{ display: 'flex', backgroundColor: '#ff4800', width: '100%', color: 'white', fontWeight: 'bold' }}>{formatDate(Date(lastestWaterParameter.createAt))}</Card.Header>
                    <Card.Body >
                        <Row>
                            <Row className="text-center">
                                <Col><strong>PH:</strong> {lastestWaterParameter.ph}</Col>
                                <Col><strong>Oxy:</strong> {lastestWaterParameter.oxygen}ppm</Col>
                                <Col><strong>Nitrite:</strong> {lastestWaterParameter.nitrite}ppm</Col>
                                <Col><strong>Nitrate:</strong> {lastestWaterParameter.nitrate}ppm</Col>
                                <Col><strong>Temperature:</strong> {lastestWaterParameter.temperature}°C</Col>
                                <Col><strong>Salt:</strong> {lastestWaterParameter.salt}ppt</Col>
                                <Col><strong>Ammonium:</strong> {lastestWaterParameter.ammonium}ppm</Col>
                            </Row>
                            <Row>
                                <Col><strong>Phostphate:</strong> {lastestWaterParameter.phosphate}ppm</Col>
                                <Col><strong>Hardness:</strong> {lastestWaterParameter.hardness}ppm</Col>
                                <Col><strong>Carbon Dioxide:</strong> {lastestWaterParameter.carbonDioxide}ppm</Col>
                                <Col><strong>Carbon Hardness:</strong> {lastestWaterParameter.carbonHardness}ppm</Col>
                                <Col><strong>Total Chlorines:</strong> {lastestWaterParameter.totalChlorines}ppm</Col>
                                <Col><strong>Outdoor Temp:</strong> {lastestWaterParameter.outdoorTemp}ppm</Col>
                                <Col><strong>Amount Fed:</strong> {lastestWaterParameter.amountFed}ppm</Col>
                            </Row>
                        </Row>
                    </Card.Body>
                </Card>
            ) : (
                <Card as={Button}
                    style={{ display: 'flex', borderRadius: '10px', border: '0.5 solid black', transition: 'background-color 0.3s' }}
                    onClick={() => setShow(true)}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8433'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                    <h3>No Water Parameter yet!</h3>
                </Card>
            )}
            <Modal show={show} onHide={setShow} backdrop='static' size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>Water Parameter</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: 'flex', flexDirection: 'column' }}>
                    <Row style={{ justifyContent: 'flex-end' }}>
                        <AddWaterParameter
                            show={showAddWaterParameter}
                            setShow={setShowAddWaterParameter}
                            pondId={pondId}
                            addNewWaterParameter={handleAddWaterParameter} />
                    </Row>
                    <hr />
                    <Row>
                        {waterParameter.length ? (
                            waterParameter.map((parameter) => (
                                <Card key={parameter.measureId} style={{ marginBottom: '10px' }}>
                                    <Card.Header>{formatDate(Date(parameter.createAt))}
                                        <DeleteWaterParameter 
                                        waterData={parameter.measureId}
                                        updateDeleteWaterData={handleDeleteWaterData}/>
                                    </Card.Header>
                                    <Card.Body style={{display:'flex', paddingTop:'30px', paddingBottom:'30px'}}>
                                        <Card.Text style={{ fontSize: '16px' }}>
                                            <Row>
                                            <Row className="text-center">
                                                <Col><strong>PH:</strong> {parameter.ph}</Col>
                                                <Col><strong>Oxy:</strong> {parameter.oxygen}ppm</Col>
                                                <Col><strong>Nitrite:</strong> {parameter.nitrite}ppm</Col>
                                                <Col><strong>Nitrate:</strong> {parameter.nitrate}ppm</Col>
                                                <Col><strong>Temperature:</strong> {parameter.temperature}°C</Col>
                                                <Col><strong>Salt:</strong> {parameter.salt}ppt</Col>
                                                <Col><strong>Ammonium:</strong> {parameter.ammonium}ppm</Col>
                                                </Row>
                                                <Row>
                                                <Col><strong>Phostphate:</strong> {parameter.phosphate}ppm</Col>
                                                <Col><strong>Hardness:</strong> {parameter.hardness}ppm</Col>
                                                <Col><strong>Carbon Dioxide:</strong> {parameter.carbonDioxide}ppm</Col>
                                                <Col><strong>Carbon Hardness:</strong> {parameter.carbonHardness}ppm</Col>
                                                <Col><strong>Total Chlorines:</strong> {parameter.totalChlorines}ppm</Col>
                                                <Col><strong>Outdoor Temp:</strong> {parameter.outdoorTemp}ppm</Col>
                                                <Col><strong>Amount Fed:</strong> {parameter.amountFed}ppm</Col>
                                            </Row>
                                            </Row>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            ))

                        ) : null}
                    </Row>
                </Modal.Body>
            </Modal>
            <Container style={{paddingTop:'30px'}}>
            <h3>Water Parameter Chart</h3>
            <CombinedCharts
            pondId={pondId}
            />
            </Container>

            <Modal show={showGetAdvice} onHide={() => setShowGetAdvice(false)} backdrop='static' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Advice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {advice ? (
                        <div>
                            <ul>
                            {advice.split('.').map((item, index) => (
                                item.trim() && <li key={index}>{item.trim()}.</li>
                            ))}
                            </ul>
                        </div>
                    ) : <h4>No Advice yet!</h4>}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default WaterParameter