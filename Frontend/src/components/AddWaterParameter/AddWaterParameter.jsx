import { Button, Col, Row } from "react-bootstrap";
import { BiDroplet } from "react-icons/bi";
import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useAuth } from '../../pages/Login/AuthProvider'
import { addWaterParameter } from "../../Config/WaterParameterApi";
const AddWaterParameter = ({ show, setShow, pondId, addNewWaterParameter }) => {
    const userId = useAuth().user.userId;
    const [waterData, setWaterData] = useState({
        pondId: pondId,
        userId: userId,
        nitrite: 0,
        oxygen: 0,
        nitrate: 0,
        temperature: 0,
        phosphate: 0,
        ph: 0,
        ammonium: 0,
        hardness: 0,
        carbonDioxide: 0,
        carbonHardness: 0,
        salt: 0,
        totalChlorines: 0,
        outdoorTemp: 0,
        amountFed: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWaterData({ ...waterData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        addWaterParameter(waterData)
        .then((response)=> {
            addNewWaterParameter(waterData);
            setWaterData({  //reset form
                pondId: pondId,
                userId: userId,
                nitrite: 0,
                oxygen: 0,
                nitrate: 0,
                temperature: 0,
                phosphate: 0,
                ph: 0,
                ammonium: 0,
                hardness: 0,
                carbonDioxide: 0,
                carbonHardness: 0,
                salt: 0,
                totalChlorines: 0,
                outdoorTemp: 0,
                amountFed: 0
            });
            console.log(response);

        })
        console.log('submit',waterData);
        setShow(false);
    };

    return (
        <>
            <Button variant="success" onClick={() => setShow(true)}
                style={{
                    width: '220px', height: '60px',
                    fontWeight: 'bold', fontSize: '18px',
                    borderRadius: '15px', backgroundColor: '#FF8433', transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FF6204'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FF8433'}>
                <BiDroplet size={20} /> Add Water Parameter
            </Button>

            <Modal show={show} onHide={setShow} size="lg" style={{backgroundColor:'#89CFF0'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Water Parameter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                                <Form.Group controlId="formNitrite">
                                    <Form.Label>Nitrite</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="nitrite"
                                        value={waterData.nitrite}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formOxygen">
                                    <Form.Label>Oxygen</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="oxygen"
                                        value={waterData.oxygen}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formNitrate">
                                    <Form.Label>Nitrate</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="nitrate"
                                        value={waterData.nitrate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTemperature">
                                    <Form.Label>Temperature</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="temperature"
                                        value={waterData.temperature}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPhosphate">
                                    <Form.Label>Phosphate</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phosphate"
                                        value={waterData.phosphate}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPh">
                                    <Form.Label>pH</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="ph"
                                        value={waterData.ph}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAmmonium">
                                    <Form.Label>Ammonium</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="ammonium"
                                        value={waterData.ammonium}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formCarbonDioxide">
                                    <Form.Label>Carbon Dioxide</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="carbonDioxide"
                                        value={waterData.carbonDioxide}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formCarbonHardness">
                                    <Form.Label>Carbon Hardness</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="carbonHardness"
                                        value={waterData.carbonHardness}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formHardness">
                                    <Form.Label>Hardness</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="hardness"
                                        value={waterData.hardness}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formSalt">
                                    <Form.Label>Salt</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="salt"
                                        value={waterData.salt}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formTotalChlorines">
                                    <Form.Label>Total Chlorines</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="totalChlorines"
                                        value={waterData.totalChlorines}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formOutdoorTemp">
                                    <Form.Label>Outdoor Temperature</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="outdoorTemp"
                                        value={waterData.outdoorTemp}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formAmountFed">
                                    <Form.Label>Amount Fed</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="amountFed"
                                        value={waterData.amountFed}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        {/* Add other form fields here */}
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddWaterParameter;