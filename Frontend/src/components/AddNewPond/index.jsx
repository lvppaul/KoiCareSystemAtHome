import './style.css'
import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap/';
import { BiImport } from "react-icons/bi";
import PondIcon from "../../assets/Pond.svg";


function AddNewPond() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Row className='pond-item'>
                <Button variant="success" onClick={handleShow}>
                    <img src={PondIcon} alt='add pond icon' /> New Pond
                </Button>
            </Row>
            <Modal show={show} onHide={handleClose} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title> <h1>Adding Pond</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3">
                            <Col className='image-pond'>
                                <div className="file-input-container">
                                    <input type="file" id="file-input" className="file-input-hidden" />
                                    <label htmlFor="file-input" className="btn btn-primary btn-lg file-input-label">
                                        <BiImport size={75} /> <br />
                                        <h5>Import Image</h5>
                                    </label>
                                </div>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter pond name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridVolumn">
                                    <Form.Label>Volumn (liter):</Form.Label>
                                    <Form.Control type="text" placeholder="Enter pond volumn (liter)" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDrainCount">
                                <Form.Label>Drain count:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Drain" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDepth">
                                <Form.Label>Depth (meter): </Form.Label>
                                <Form.Control type="text" placeholder="Depth (meter)" />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridSkimmer">
                                <Form.Label>Skimmer count:</Form.Label>
                                <Form.Control type="text" placeholder="Enter skimmer" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPumping">
                                <Form.Label>Pumping capacity (l/h):</Form.Label>
                                <Form.Control type="text" placeholder="Pumping (l/h)" />
                            </Form.Group>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose} style={{ backgroundColor: '#00C92C' }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewPond;