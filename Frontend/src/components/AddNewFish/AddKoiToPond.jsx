import React, { useState, useContext, useEffect } from 'react';
import { Button, Modal, Form, Row, Spinner } from 'react-bootstrap';
import { ToastContext } from '../../App';
import { useAuth } from '../../pages/Login/AuthProvider';
import { getAllKoiByUserId, getKoiById, updateKoi } from '../../Config/KoiApi';
import { useParams } from 'react-router-dom';
import FishIcon from "../../assets/Addfish.svg";

const AddKoiToPond = ({ show, setShow, onAddFish }) => {
    const { setToastMessage } = useContext(ToastContext);
    const [loading, setLoading] = useState(false);
    const [selectedFish, setSelectedFish] = useState('');
    const [koiList, setKoiList] = useState([]);
    const userId = useAuth().user.userId;
    const {pondId} = useParams();
    const [error, setError] = useState('');
    const handleClose = () => setShow(false);

    const handleKoiList = async () => {
        const response = await getAllKoiByUserId(userId);
        setKoiList(response);
    };

    useEffect(() => {
        handleKoiList();
    }, []);

    const handleSelectFish = (event) => {
        setSelectedFish(event.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await getKoiById(selectedFish);
            const updatedKoi = { ...response, pondId: pondId };
            const addtoPond = await updateKoi(updatedKoi);
            onAddFish(updatedKoi);
            console.log(addtoPond);
            setLoading(false);
            handleClose();
            setToastMessage("Fish added to pond successfully!");
        } catch (error) {
            console.error("Error adding fish to pond:", error.response.data);
            setError(error.response.data || "Failed to add fish to pond!");
            setLoading(false);
            setToastMessage("Failed to add fish to pond!");
        }
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}
                 style={{
                    width: "180px",
                    height: "60px",
                    fontWeight: "bold",
                    fontSize: "18px",
                    borderRadius: "15px",
                    backgroundColor: "#FF8433",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF6204")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF8433")}>
                <img src={FishIcon} alt="add fish icon" /> Add Koi
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Add Koi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {loading ? (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    ) : (
                        <Form onSubmit={handleSubmit}>
                            <Row className="mb-3">
                                {error && <p style={{ color: "red" }}>{error}</p>}
                                <Form.Group controlId="formSelectFish">
                                    <Form.Label>Select Fish</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={selectedFish}
                                        onChange={handleSelectFish}
                                        required
                                    >
                                        <option value="">Select Fish</option>
                                        {koiList.map((koi) => (
                                            <option key={koi.koiId} value={koi.koiId}>
                                                {koi.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Row>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" style={{ backgroundColor: "#00C92C" }}>
                                {loading ? <Spinner animation="border" size="sm" /> : "Save"}
                            </Button>
                        </Form>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddKoiToPond;