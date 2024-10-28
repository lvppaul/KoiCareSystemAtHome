import { Card, Button, Modal, Row, Col } from 'react-bootstrap';
import AddWaterParameter from '../AddWaterParameter/AddWaterParameter';
import { useEffect, useState } from 'react';
import { getWaterParameter } from '../../Config/WaterParameterApi.jsx';
const WaterParameter = ({ show, setShow, pondId }) => {
    const [showAddWaterParameter, setShowAddWaterParameter] = useState(false);
    const [waterParameter, setWaterParameter] = useState([]);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };
    useEffect(() => {
        try{
            getWaterParameter(pondId)
            .then(data => setWaterParameter(data))
            .catch(error => console.error('Error fetching water parameter:', error));
        } catch (error) {
            console.error('Error fetching water parameter:', error);
        }
    }, [pondId]);
  return (
    <>
    <Card as={Button} 
    style={{ display:'flex',padding: '10px', borderRadius: '10px', border:'0.5 solid black', transition: 'background-color 0.3s' }} 
    onClick={() => setShow(true)}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8433'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
    >
        <Card.Header>Create At</Card.Header>
            <Card.Body>
                <Row className="text-center">
                    <Col><strong>Temperature:</strong> 30°C</Col>
                    <Col><strong>PH:</strong> 7.5</Col>
                    <Col><strong>Salinity:</strong> 30ppt</Col>
                    <Col><strong>Ammonia:</strong> 0.5ppm</Col>
                    <Col><strong>Nitrate:</strong> 0.5ppm</Col>
                    <Col><strong>Nitrite:</strong> 0.5ppm</Col>
                    <Col><strong>Alkalinity:</strong> 0.5ppm</Col>
                    <Col><strong>Hardness:</strong> 0.5ppm</Col>
                </Row>
            </Card.Body>
    </Card>
    <Card as={Button} 
    style={{ display:'flex', borderRadius: '10px', border:'0.5 solid black', transition: 'background-color 0.3s' }} 
    onClick={() => setShow(true)}
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF8433'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
    >
        <h3>No Water Parameter yet!</h3>
    </Card>

    <Modal show={show} onHide={setShow} backdrop='static' size='xl'>
        <Modal.Header closeButton>
            <Modal.Title>Water Parameter</Modal.Title> 
        </Modal.Header>
            <Modal.Body>
                <Row style={{justifyContent:'flex-end'}}>
                <AddWaterParameter
                show={showAddWaterParameter}
                setShow={setShowAddWaterParameter}
                pondId={pondId}/>
                </Row>
                <hr/>
                <Row>
            {waterParameter.length ? (
            waterParameter.map((parameter,index) => (
            <Card key={index}>
                <Card.Header>{formatDate(Date(parameter.createAt))}</Card.Header>
                <Card.Body>
                    <Card.Text style={{fontSize:'18px'}}>
                        <Row className="text-center">
                            <Col><strong>PH:</strong> {parameter.ph}</Col>
                            <Col><strong>Oxy:</strong> {parameter.oxygen}ppm</Col>
                            <Col><strong>Nitrite:</strong> {parameter.nitrite}ppm</Col>
                            <Col><strong>Nitrate:</strong> {parameter.nitrate}ppm</Col>
                            <Col><strong>Temperature:</strong> {parameter.temperature}°C</Col>
                            <Col><strong>Salt:</strong> {parameter.salt}ppt</Col>
                            <Col><strong>Ammonium:</strong> {parameter.ammonium}ppm</Col>
                            <Col><strong>Phostphate:</strong> {parameter.phosphate}ppm</Col>
                            <Col><strong>Hardness:</strong> {parameter.hardness}ppm</Col>
                            <Col><strong>Carbon Dioxide:</strong> {parameter.carbonDioxide}ppm</Col>
                            <Col><strong>Carbon Hardness:</strong> {parameter.carbonHardness}ppm</Col>
                            <Col><strong>Total Chlorines:</strong> {parameter.totalChlorines}ppm</Col>
                            <Col><strong>Outdoor Temp:</strong> {parameter.outdoorTemp}ppm</Col>
                            <Col><strong>Amount Fed:</strong> {parameter.amountFed}ppm</Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    
) : null}
                </Row>
            </Modal.Body>
    </Modal>
    </>
  )
}

export default WaterParameter