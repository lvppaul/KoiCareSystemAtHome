import { useState } from 'react';
import { Button, Modal, Form, Row, Col, Spinner } from 'react-bootstrap/';
import { BiImport } from "react-icons/bi";
import FishIcon from "../../assets/Addfish.svg";
import api from '../../Config/AxiosConfig';
import { MdAdd } from "react-icons/md";
import { storage } from '../../Config/firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';

const AddNewFish = (props) => {
    const { show, setShow } = props;
    const[loading, setLoading] = useState(false);
    const handleClose = () => setShow(false);

    // useState modal form
    const [koiId, setKoiId] = useState("");
    const [userId, setUserId] = useState("");
    const [pondId, setPondId] = useState("");
    const [age, setAge] = useState("");
    const [name, setName] = useState("");
    const [note, setNote] = useState("");
    const [origin, setOrigin] = useState("");
    const [length, setLength] = useState("");
    const [weight, setWeight] = useState("");
    const [color, setColor] = useState("");
    const [status, setStatus] = useState(false);
    const [koiThumbnails, setkoiThumbnails] = useState([]);
    const [previewImage, setPreviewImage] = useState("");

    
    const metadata = {
        contentType: 'image/jpeg',
    };

    // upload image
    const handleUploadImg = (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                setPreviewImage(URL.createObjectURL(file));
                setkoiThumbnails(file);
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    }

    const handleSubmitFish = async () => {
        // validate form
        if(!koiThumbnails) {
            alert('no image selected');
            return;
        }
        setLoading(true);
        const storageRef = ref (storage, `/koi/koiThumbnails/${koiThumbnails.name}`);

        try{
            const snapshot = await uploadBytes(storageRef, koiThumbnails, metadata);
            const downloadURL = await getDownloadURL(snapshot.ref);
            setkoiThumbnails(downloadURL);

        const koiData = {
            koiId,
            userId,
            pondId,
            age,
            name,
            note,
            origin,
            length,
            weight,
            color,
            status,
            koiThumbnails: downloadURL
        };

        // koiThumbnails.forEach((image, index) => {

        // });

        try {
            // const response = await api.post("fish", koiData);
            console.log(koiData);
        } catch (error) {
            console.log(error);
        }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setShow(false);
            setKoiId("");
            setUserId("");
            setPondId("");
            setAge("");
            setName("");
            setNote("");
            setOrigin("");
            setLength("");
            setWeight("");
            setColor("");
            setStatus(false);
            setkoiThumbnails();
            setPreviewImage("");
            alert("adding new fish complete");
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
                        <Form>
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
                                                value={name}
                                                onChange={(event) => setName(event.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridAge">
                                            <Form.Label>Age (years):</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish age"
                                                value={age}
                                                onChange={(event) => setAge(event.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridLength">
                                            <Form.Label>Length (cm):</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish length"
                                                value={length}
                                                onChange={(event) => setLength(event.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridWeight">
                                            <Form.Label>Weight (g):</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish weight"
                                                value={weight}
                                                onChange={(event) => setWeight(event.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridColor">
                                            <Form.Label>Color:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish color"
                                                value={color}
                                                onChange={(event) => setColor(event.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridOrigin">
                                            <Form.Label>Origin:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter fish origin"
                                                value={origin}
                                                onChange={(event) => setOrigin(event.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridNote">
                                            <Form.Label>Note:</Form.Label>
                                            <Form.Control type="text" placeholder="Enter note"
                                                value={note}
                                                onChange={(event) => setNote(event.target.value)} />
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="formGridStatus">
                                            <Form.Check type="checkbox" label="Status"
                                                checked={status}
                                                onChange={(event) => setStatus(event.target.checked)} />
                                        </Form.Group>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitFish()} style={{ backgroundColor: '#00C92C' }}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddNewFish;