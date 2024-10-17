import './AddNewPond.css'
import { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap/';
import { BiImport } from "react-icons/bi";
import PondIcon from "../../assets/Pond.svg";
import { storage } from '../../Config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../../pages/Login/AuthProvider';
import { postPond } from '../../Config/PondApi';

const AddNewPond = (props) => {
    const { show, setShow, onPondAdded } = props;
    const [loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const user = useAuth();
    const userId = user.user.userId;
    //useState modal form
    const [name, setName] = useState("");
    const [volume, setVolume] = useState("");
    const [depth, setDepth] = useState("");
    const [pump, setPump] = useState("");
    const [drain, setDrain] = useState("");
    const [skimmer, setSkimmer] = useState("");
    const [note, setNote] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    // handle preview image
    const handleUploadImg = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(localStorage.getItem('user'));
            setPreviewImage(URL.createObjectURL(file));
            setThumbnail(file);
        }
    }

    const handleSubmitPond = async (event) => {
        if(event) event.preventDefault();
        
        if (!thumbnail) {
            console.log("No image selected");
            return;
        }
        setLoading(true);
        // Upload image
        const imagePath = `/pond/pondThumbnails/${userId}/${Date.now()}_${thumbnail.name}`;
        const storageRef = ref(storage, imagePath);
        try {
            const snapshot = await uploadBytes(storageRef, thumbnail);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('Image uploaded:', downloadURL);
            const pondData = {
                userId: userId,
                name,
                volume,
                depth,
                pumpingCapacity: pump,
                drain,
                skimmer,
                note,
                thumbnail: imagePath, // Save the URL as ImagePath
            };
            console.log('pondData', pondData);
            // Call API
            postPond(pondData)
                .then((response) => {
                    console.log('Pond added:', response);
                    alert('Pond added successfully', response);
                    console.log('image', thumbnail);
                    console.log('storageRef', storageRef);
                    setName("");
                    setVolume("");
                    setDepth("");
                    setPump("");
                    setDrain("");
                    setSkimmer("");
                    setNote("");
                    setPreviewImage(""); // Reset the preview image
                    setThumbnail(""); // Reset the image state
                    handleClose();
                    if (onPondAdded) {
                        onPondAdded(response);
                    }

                    setLoading(false);
                });
        } catch (error) {
            console.error('Error uploading image:', error);
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
                    <Form onSubmit={handleSubmitPond}>
                        <Row className="mb-3" >
                            <Col className='image-pond' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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
                                            <img src={previewImage} alt={previewImage} />
                                            :
                                            <span style={{ color: '#eeeeee' }}>Preview image</span>
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
                                            onChange={(event) => setName(event.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridVolume">
                                        <Form.Label>volume (liter):</Form.Label>
                                        <Form.Control type="number" placeholder="Enter pond volume (liter)"
                                            value={volume}
                                            onChange={(event) => setVolume(event.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridDrainCount">
                                        <Form.Label>Drain count:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Drain"
                                            value={drain}
                                            onChange={(event) => setDrain(event.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridDepth">
                                        <Form.Label>Depth (meter): </Form.Label>
                                        <Form.Control type="number" placeholder="Depth (meter)"
                                            value={depth}
                                            onChange={(event) => setDepth(event.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridSkimmer">
                                        <Form.Label>Skimmer count:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter skimmer"
                                            value={skimmer}
                                            onChange={(event) => setSkimmer(event.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridPumping">
                                        <Form.Label>Pumping capacity (l/h):</Form.Label>
                                        <Form.Control type="number" placeholder="Pumping (l/h)"
                                            value={pump}
                                            onChange={(event) => setPump(event.target.value)} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formNote">
                                        <Form.Label>Note:</Form.Label>
                                        <Form.Control type="text" placeholder="Note"
                                            value={note}
                                            onChange={(event) => setNote(event.target.value)} />
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitPond()} style={{ backgroundColor: '#00C92C' }}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Save"}
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}
export default AddNewPond;
