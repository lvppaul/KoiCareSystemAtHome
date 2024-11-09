import './AddNewPond.css';
import { useState, useContext } from 'react';
import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap/';
import { BiImport } from "react-icons/bi";
import PondIcon from "../../assets/Pond.svg";
import { storage } from '../../Config/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useAuth } from '../../pages/Login/AuthProvider';
import { postPond } from '../../Config/PondApi';
import { ToastContext } from '../../App';

const AddNewPond = ({ show, setShow, onPondAdded }) => {
    const initialPondState = { name: '', volume: '', depth: '', pumpingCapacity: '', drain: '', skimmer: '', note: '', thumbnail: null };
    const [ponddetail, setPondDetail] = useState(initialPondState);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [storageRef, setStorageRef] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const userId = useAuth().user.userId;
    const { setToastMessage } = useContext(ToastContext);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPondDetail({ ...ponddetail, [name]: value });
    };

    const handleUploadImg = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) { // Check if the file is an image
            setPreviewImage(URL.createObjectURL(file));
            const storageRef = ref(storage, `/pond/pondThumbnails/${userId}/${file.name + Date.now()}`);
            setFile(file);
            setStorageRef(storageRef);
            setPondDetail({ ...ponddetail, thumbnail: storageRef.fullPath });
        } else {
            console.log('Invalid file type');
        }
    };

    const handleSubmitPond = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (file) {
                await uploadBytes(storageRef, file);
            }
            const newPond = { ...ponddetail, userId };
            console.log('Adding pond:', newPond);
            await postPond(newPond);
            await onPondAdded(newPond);
            setToastMessage('Pond added successful!');
            setPondDetail(initialPondState);
            setPreviewImage(null);
            setShow(false);
        } catch (error) {
            console.error('Error adding pond:', error);
            setToastMessage('Pond added failed!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
                <Button variant="success" onClick={() => setShow(true)}
                    style={{ width: '180px', height: '70px', 
                        fontWeight: 'bold', fontSize: '16px', 
                        borderRadius: '15px', backgroundColor: '#FF8433', transition: 'background-color 0.3s ease'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#FF6204'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF8433'}>
                    <img src={PondIcon} alt='add pond icon' /> New Pond
                </Button>
            <Modal show={show} onHide={() => setShow(false)} size='xl' className='modal-addpond'>
                <Modal.Header closeButton>
                    <Modal.Title> <h1>Adding Pond</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitPond}>
                        <Row className="mb-3">
                            <Col className='image-pond' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <div>
                                    <Row className="file-input-container">
                                        <Form.Control type="file" id='file-input' hidden onChange={handleUploadImg} />
                                        <label htmlFor="file-input" className="btn btn-primary btn-lg file-input-label">
                                            Import Image <BiImport size={30} />
                                        </label>
                                    </Row>
                                    <Row className='img-preview'>
                                        {previewImage ? <img src={previewImage} alt="Preview" /> : <span style={{ color: '#eeeeee' }}>Preview image</span>}
                                    </Row>
                                </div>
                            </Col>
                            <Col>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridName">
                                        <Form.Label>Name:</Form.Label>
                                        <Form.Control type="text" placeholder="Enter pond name" name='name' value={ponddetail.name} onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridVolume">
                                        <Form.Label>Volume (liter):</Form.Label>
                                        <Form.Control type="number" placeholder="Enter pond volume (liter)" name='volume' value={ponddetail.volume} onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridDrainCount">
                                        <Form.Label>Drain count:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Drain" name='drain' value={ponddetail.drain} onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridDepth">
                                        <Form.Label>Depth (meter):</Form.Label>
                                        <Form.Control type="number" placeholder="Depth (meter)" name='depth' value={ponddetail.depth} onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridSkimmer">
                                        <Form.Label>Skimmer count:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter skimmer" name='skimmer' value={ponddetail.skimmer} onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridPumping">
                                        <Form.Label>Pumping capacity (l/h):</Form.Label>
                                        <Form.Control type="number" placeholder="Pumping (l/h)" name='pumpingCapacity' value={ponddetail.pump} onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formNote">
                                        <Form.Label>Note:</Form.Label>
                                        <Form.Control type="text" placeholder="Note" name='note' value={ponddetail.note} onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="justify-content-end">
                            <Button variant="secondary" onClick={() => setShow(false)} style={{ marginRight: '10px', width: '75px', height: '40px' }}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" style={{ backgroundColor: '#00C92C', width: '75px', height: '40px' }}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Save"}
                            </Button>
                        </Row>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddNewPond;
