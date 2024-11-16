import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Spinner, Alert } from 'react-bootstrap';
import { getAllKoiByUserId, getKoiById, changePondKoi } from '../../Config/KoiApi';
import { useAuth } from '../../pages/Login/AuthProvider';
import { useContext } from 'react';
import { ToastContext } from '../../App';
import FishIcon from "../../assets/Addfish.svg";

const AddKoiToPond = ({show, setShow, pondId, onAddFish }) => {
    const { setToastMessage } = useContext(ToastContext);
    const [koiList, setKoiList] = useState([]);
    const [selectedFish, setSelectedFish] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const userId = useAuth().user.userId;
    
    const handleKoiList = async () => {
        const response = await getAllKoiByUserId(userId);
        setKoiList(response);
    };
    const handleClose = () => setShow(false);

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
            const koi = await changePondKoi(selectedFish, pondId);
            console.log("Fish added to pond:", koi.status);
            if (koi.status === 200) {
                const addFish = await getKoiById(selectedFish);
                setError(null);
                setLoading(false);
                setToastMessage("Fish added to pond successfully!");
                onAddFish(addFish);
                setShow(false);
            }
        } catch (error) {
            console.error("Error adding fish to pond:", error);
            setError(error.message || "Failed to add koi to pond!");
            setLoading(false);
            setToastMessage("Failed to add fish to pond!");
        }
    };

    return (
        <>
            <Button
            onClick={setShow}
            style={{
            width: "150px",
            height: "60px",
            fontWeight: "bold",
            fontSize: "18px",
            borderRadius: "15px",
            backgroundColor: "#FF8433",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF6204")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF8433")}
        >
          <img src={FishIcon} alt="add fish icon" />
          Add Koi
        </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Koi to Pond</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formFishSelect">
                            <Form.Label>Select Fish</Form.Label>
                            <Form.Control as="select" value={selectedFish} onChange={handleSelectFish}>
                                <option value="">Select a fish</option>
                                {koiList.map((koi) => (
                                    <option key={koi.koiId} value={koi.koiId}>
                                        {koi.name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : "Add Fish"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddKoiToPond;