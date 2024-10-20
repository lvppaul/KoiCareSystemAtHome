import { useState } from 'react';
import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap/';
import { BiImport } from "react-icons/bi";
import FishIcon from "../../assets/Addfish.svg";
import { MdAdd } from "react-icons/md";
import { storage } from '../../Config/firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { useAuth } from '../../pages/Login/AuthProvider';
import { postKoi } from '../../Config/KoiApi';

const AddNewFish = ({ show, setShow, onKoiAdded }) => {
    const newKoi = useState({ name: '', age: '', note: '', origin: '', length: '', weight: '', color: '', status: false, thumbnail: '' });
    const[loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);
    const [koidetail, setKoiDetail] = useState(newKoi);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setKoiDetail({ ...koidetail, [name]: value });
    }
    const userId = useAuth().user.userId;
    const [file, setFile] = useState(null);
    const [storageRef, setStorageRef] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    // upload image
    const handleUploadImg = (event) => {
        const file = event.target.files[0];
        if(file && file.type.startsWith('image/')) {
            setPreviewImage(URL.createObjectURL(file));
            const storageRef = ref(storage, `/koi/koiThumbnails/${userId}/${file.name + Date.now()}`);
            try {
                setFile(file);
                setStorageRef(storageRef);
                setKoiDetail({ ...koidetail, thumbnail: storageRef.fullPath, userId: userId });
            } catch (error) {
                console.error("Error uploading image: ", error);
            }
        } else {
            console.log("Invalid file type");
        }
    };

    const handleSubmitFish = async () => {
        setLoading(true);
        try {
            console.log('koidetail', koidetail);
            console.log('file', file);
            console.log('newkoi', newKoi);
            if (file) {
                await uploadBytes(storageRef, file);
                const thumbnail = await getDownloadURL(storageRef);
                await postKoi(koidetail);
                //onPondAdded(newKoi);
            } else {
                await postKoi(koidetail);
                //onPondAdded(koidetail);
            }
            setLoading(false);
            setShow(false);
        } catch (error) {
            console.error('Error adding pond:', error);
            setLoading(false);
        }
    }

    return (
        <>
            <Row className='fish-item' 
            style={{justifyContent:'flex-end', margin:'20px 0'}} >
                <Button variant="success" onClick={setShow} style={{width:'180px', height:'70px', fontWeight:'bold', fontSize: '18px', borderRadius:'15px', backgroundColor: '#FF8433'}}>
                    <img src={FishIcon} alt='add fish icon' />
                     <MdAdd size={20} style={{marginBottom:'30px'}}/>
                    Add Fish
                </Button>
            </Row>
            <Modal show={show} onHide={setShow} size='xl' className='modal-addblog'>
                <Modal.Header closeButton>
                    <Modal.Title> <h1>Adding Fish</h1></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmitFish}>
                            <Row className="mb-3">
                                <Col className='image-fish' style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
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
                                            <Form.Control type="text" placeholder="Enter fish name"
                                                name='name'
                                                value={koidetail.name}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridAge">
                                            <Form.Label>Age (years):</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish age"
                                                name='age'
                                                value={koidetail.age}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridLength">
                                            <Form.Label>Length (cm):</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish length"
                                                name='length'
                                                value={koidetail.length}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridWeight">
                                            <Form.Label>Weight (g):</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish weight"
                                                name='weight'
                                                value={koidetail.weight}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridColor">
                                            <Form.Label>Color:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish color"
                                                name='color'
                                                value={koidetail.color}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridOrigin">
                                            <Form.Label>Origin:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish origin"
                                                name='origin'
                                                value={koidetail.origin}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridNote">
                                            <Form.Label>Note:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter note"
                                                name='note'
                                                value={koidetail.note}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridStatus">
                                            <Form.Check type="checkbox" label="Status"
                                                name='status'
                                                checked={koidetail.status}
                                                onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                </Col>
                            </Row>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type='submit' style={{ backgroundColor: '#00C92C' }}>
                        Save
                    </Button>
                        </Form>
                    )}
                </Modal.Body>
               
            </Modal>
                
        </>
    );
}

export default AddNewFish;