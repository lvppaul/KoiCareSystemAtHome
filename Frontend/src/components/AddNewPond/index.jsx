import './style.css'
import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap/';
import {  BiImport } from "react-icons/bi";
import PondIcon from "../../assets/Pond.svg";


function AddNewPond() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //useState modal form
    const[name,setName] = useState("");
    const[volumn,setVolumn] = useState("");
    const[depth,setDepth] = useState("");
    const[pump,setPump] = useState("");
    const[drain,setDrain] = useState("");
    const[skimmer,setSkimmer] = useState("");
    const[image,setImage] = useState("");
    const[previewImage, setPreviewImage] = useState("");

    //upload image
    const handleUploadImg = (event) => {
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);;
        }; 
    }
    return (
        <>
            <Row className='pond-item'>
                <Button variant="success" onClick={handleShow}>
                    <img src={PondIcon} alt='add pond icon' /> New Pond
                </Button>
            </Row>
            <Modal show={show} onHide={handleClose} size='xl' className='modal-addpond'>
                <Modal.Header closeButton>
                    <Modal.Title> <h1>Adding Pond</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3" >
                            <Col className='image-pond' style={{ display: 'flex',justifyContent: 'space-around', alignItems: 'center'}}>
                                <div className="file-input-container">
                                    <Form.Control type="file" id='file-input' hidden 
                                    onChange={(event) => handleUploadImg(event)}
                                    />
                                    <label htmlFor="file-input" className="btn btn-primary btn-lg file-input-label">
                                        <BiImport size={75} /> <br />
                                        <h5>Import Image</h5>
                                    </label>
                                </div>
                                <div md={6} className='img-preview'>  
                                    {previewImage ? 
                                        <img src={previewImage} alt={previewImage}/>
                                        :
                                        <span style={{color:'#eeeeee'}}>Preview image</span>
                                    }
                                </div>
                            </Col>
                            <Col>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter pond name" 
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}/>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridVolumn">
                                    <Form.Label>Volumn (liter):</Form.Label>
                                    <Form.Control type="text" placeholder="Enter pond volumn (liter)" 
                                    value={volumn}
                                    onChange={(event) => setVolumn(event.target.value)}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridDrainCount">
                                <Form.Label>Drain count:</Form.Label>
                                <Form.Control type="text" placeholder="Enter Drain" 
                                value={drain}
                                onChange={(event) => setDrain(event.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridDepth">
                                <Form.Label>Depth (meter): </Form.Label>
                                <Form.Control type="text" placeholder="Depth (meter)" 
                                value={depth}
                                onChange={(event) => setDepth(event.target.value)}/>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="formGridSkimmer">
                                <Form.Label>Skimmer count:</Form.Label>
                                <Form.Control type="text" placeholder="Enter skimmer" 
                                value={skimmer}
                                onChange={(event) => setSkimmer(event.target.value)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPumping">
                                <Form.Label>Pumping capacity (l/h):</Form.Label>
                                <Form.Control type="text" placeholder="Pumping (l/h)" 
                                value={pump}
                                onChange={(event) => setPump(event.target.value)}/>
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