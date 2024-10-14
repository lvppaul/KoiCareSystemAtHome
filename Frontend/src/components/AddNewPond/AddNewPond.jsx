import './AddNewPond.css'
import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap/';
import {  BiImport } from "react-icons/bi";
import PondIcon from "../../assets/Pond.svg";
import api from '../../Config/AxiosConfig';
import { storage } from '../../Config/firebase';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {Spinner } from 'react-bootstrap';
import { useAuth } from '../../pages/Login/AuthProvider';


const AddNewPond = (props) => {
    const {show,setShow} = props;
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const user = useAuth();
    const email = user.user.email;
    //useState modal form
    const[name,setName] = useState("");
    const[volumn,setVolumn] = useState("");
    const[depth,setDepth] = useState("");
    const[pump,setPump] = useState("");
    const[drain,setDrain] = useState("");
    const[skimmer,setSkimmer] = useState("");
    const[image,setImage] = useState("");
    const[previewImage, setPreviewImage] = useState("");
    
    const metadata = {
        contentType: 'image/jpeg',
    };

    // handle preview image
    const handleUploadImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(email);
            setPreviewImage(URL.createObjectURL(file));
            setImage(file);
        }
    }

    const handleSubmitPond = async () => {
        if (!image) {
            console.log("No image selected");
            return;
        }
        setLoading(true);
        // Upload image
        const storageRef = ref(storage, `/pond/pondThumbnails/${email}/${image.name}`);
        try {
            const snapshot = await uploadBytes(storageRef, image, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setImage(downloadURL);

            // Prepare pond data
            const pondData = {
                name,
                volumn,
                depth,
                pump,
                drain,
                skimmer,
                image: downloadURL
            };

            // Call API
            try {
                const response = await api.post("pond", pondData);
                console.log(pondData);
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log("Error uploading image:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Row className='pond-item'>
            <Button variant="success" onClick={setShow}>
                <img src={PondIcon} alt='add pond icon' /> New Pond
            </Button>
            </Row>
            <Modal show={show} onHide={setShow} size='xl' className='modal-addpond'>
                <Modal.Header closeButton>
                    <Modal.Title> <h1>Adding Pond</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3" >
                            <Col className='image-pond' style={{ display: 'flex',justifyContent: 'space-around', alignItems: 'center'}}>
                                <div>
                                <Row className="file-input-container">
                                    <Form.Control type="file" id='file-input' hidden 
                                    onChange={(event) => handleUploadImg(event)}
                                    />
                                    <label htmlFor="file-input" className="btn btn-primary btn-lg file-input-label">
                                        Import Image <BiImport size={30} /> 
                                    </label>
                                </Row>
                                <Row className='img-preview'> 
                                    {previewImage ? 
                                        <img src={previewImage} alt={previewImage}/>
                                        :
                                        <span style={{color:'#eeeeee'}}>Preview image</span>
                                    }
                                </Row>
                                </div>
                            </Col>
                            <Col>
                                <Row>
                                <Form.Group as={Col} controlId="formGridName">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter pond name" 
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}/>
                                </Form.Group>
                                </Row>
                                <Row>
                                <Form.Group as={Col} controlId="formGridVolumn">
                                    <Form.Label>Volumn (liter):</Form.Label>
                                    <Form.Control type="text" placeholder="Enter pond volumn (liter)" 
                                    value={volumn}
                                    onChange={(event) => setVolumn(event.target.value)}/>
                                </Form.Group>
                                </Row>
                                <Row>
                                <Form.Group as={Col} controlId="formGridDrainCount">
                                    <Form.Label>Drain count:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Drain" 
                                    value={drain}
                                    onChange={(event) => setDrain(event.target.value)}/>
                                </Form.Group>
                                </Row>
                                <Row>
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
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridPumping">
                                        <Form.Label>Pumping capacity (l/h):</Form.Label>
                                        <Form.Control type="text" placeholder="Pumping (l/h)" 
                                        value={pump}
                                        onChange={(event) => setPump(event.target.value)}/>
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitPond()} style={{ backgroundColor: '#00C92C' }}>
                    {loading ? <Spinner animation="border" size="sm" /> : "Save"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AddNewPond;