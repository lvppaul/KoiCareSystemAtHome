import { useState } from 'react';
import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap/';
import { BiImport, BiInfoCircle } from "react-icons/bi";
import { storage } from '../../Config/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { useAuth } from '../../pages/Login/AuthProvider';
import { updatePond } from '../../Config/PondApi';

const UpdatePondDetail = ({ show, setShow, pond, setPond }) => {
    const [loading, setLoading] = useState(false);
    const [ponddetail, setPondDetail] = useState(pond);
    const [file, setFile] = useState(null);
    const [storageRef, setStorageRef] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const handleClose = () => setShow(false);
    const userId = useAuth().user.userId;

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPondDetail({ ...ponddetail, [name]: value });
    };

    // handle preview image
    const handleUploadImg = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) { // Check if the file is an image
            setPreviewImage(URL.createObjectURL(file));
            const storageRef = ref(storage, `/pond/pondThumbnails/${userId}/${file.name + Date.now()}`);
            try {
                setFile(file);
                setStorageRef(storageRef);
                setPondDetail({ ...ponddetail, thumbnail: storageRef.fullPath });
            } catch (error) {
                console.error('Error setting image:', error);
            }
        } else {
            console.log('Invalid file type');
        }
    };

    const handleSubmitPondUpdate = async (event) => {
        event.preventDefault();
        const previousThumbnail = pond.thumbnail;
        try {
            if (file) {
                await uploadBytes(storageRef, file);
                const newThumbnail = await getDownloadURL(storageRef);
                await updatePond(ponddetail);
                setPond({ ...ponddetail, thumbnail: newThumbnail });

                if (previousThumbnail) {
                    const imageRef = ref(storage, previousThumbnail);
                    await deleteObject(imageRef);
                    console.log('Image deleted successfully');
                }
            } else {
                await updatePond(ponddetail);
                setPond({ ...ponddetail, thumbnail: previousThumbnail });
            }
            setFile(null);
            setPreviewImage(null);
            setLoading(false);
            handleClose();
        } catch (error) {
            console.error('Error updating pond:', error);
            setLoading(false);
        }
    };



    return (
        <>
            <Button onClick={setShow} style={{ width: '180px', height: '70px', fontWeight: 'bold', fontSize: '18px', borderRadius: '15px', backgroundColor: '#FF8433' }}>
                <BiInfoCircle size={35}/> Update Pond
            </Button>
            <Modal show={show} onHide={setShow} size='xl' className='modal-updatepond'>
                <Modal.Header closeButton>
                    <Modal.Title> <h1>Updating Pond</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitPondUpdate}>
                        <Row className="mb-3" >
                            <Col className='image-pond' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <div>
                                    <Row className="file-input-container">
                                        <Form.Control type="file" id='file-input' hidden
                                            onChange={handleUploadImg}
                                        />
                                        <label htmlFor="file-input" className="btn btn-primary btn-lg file-input-label">
                                            Import Image <BiImport size={30} />
                                        </label>
                                    </Row>
                                    <Row className='img-preview'>
                                        {previewImage ?
                                            <img src={previewImage} alt="Preview" />
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
                                            name="name"
                                            value={ponddetail.name}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridVolume">
                                        <Form.Label>Volume:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter pond volume (liter)"
                                            name="volume"
                                            value={ponddetail.volume}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridVolume">
                                        <Form.Label>Drain:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Drain"
                                            name="drain"
                                            value={ponddetail.drain}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridDepth">
                                        <Form.Label>Depth (meter): </Form.Label>
                                        <Form.Control type="number" placeholder="Depth (meter)"
                                            name="depth"
                                            value={ponddetail.depth}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridSkimmer">
                                        <Form.Label>Skimmer count:</Form.Label>
                                        <Form.Control type="number" placeholder="Enter skimmer"
                                            name="skimmer"
                                            value={ponddetail.skimmer}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formGridPumping">
                                        <Form.Label>Pumping capacity (l/h):</Form.Label>
                                        <Form.Control type="number" placeholder="Pumping (l/h)"
                                            name="pumpingCapacity"
                                            value={ponddetail.pumpingCapacity}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} controlId="formNote">
                                        <Form.Label>Note:</Form.Label>
                                        <Form.Control type="text" placeholder="Note"
                                            name="note"
                                            value={ponddetail.note}
                                            onChange={handleInputChange} />
                                    </Form.Group>
                                </Row>
                            </Col>
                        </Row>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type='submit' style={{ backgroundColor: '#00C92C' }}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Save"}
                        </Button>
                    </Form>
                </Modal.Body >
            </Modal >
        </>
    );
}

export default UpdatePondDetail;