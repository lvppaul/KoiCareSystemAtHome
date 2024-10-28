import { Button } from "react-bootstrap";
import { BiDroplet } from "react-icons/bi";
import React, { useState } from 'react';
import { Modal, Form } from 'react-bootstrap';

const AddWaterParameter = ({ show, setShow,  }) => {
    const [formData, setFormData] = useState({
        pondId: 0,
        userId: '',
        nitrite: 0,
        oxygen: 0,
        nitrate: 0,
        temperature: 0,
        phosphate: 0,
        ph: 0,
        ammonium: 0,
        hardness: 0,
        carbonDioxide: 0,
        carbonHardness: 0,
        salt: 0,
        totalChlorines: 0,
        outdoorTemp: 0,
        amountFed: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        setShow(false);
    };

    return (
        <>
            <Button variant="success" onClick={()=> setShow(true)}
                style={{
                    width: '220px', height: '60px',
                    fontWeight: 'bold', fontSize: '18px',
                    borderRadius: '15px', backgroundColor: '#FF8433', transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FF6204'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FF8433'}>
                <BiDroplet size={20} /> Add Water Parameter
            </Button>

            <Modal show={show} onHide={setShow}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Water Parameter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formPondId">
                            <Form.Label>Pond ID</Form.Label>
                            <Form.Control
                                type="number"
                                name="nitrite"
                                value={formData.pondId}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formUserId">
                            <Form.Label>User ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="userId"
                                value={formData.userId}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {/* Add other form fields here */}
                        <Button variant="secondary" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddWaterParameter;