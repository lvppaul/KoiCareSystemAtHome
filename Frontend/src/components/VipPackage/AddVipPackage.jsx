import React, { useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { addVipPackage } from '../../Config/VipPackageApi';
import {ToastifyMessage} from '../Toastify/ToastifyModel';
import { set } from 'date-fns';

const AddVipPackage = ({ show, setShow, updateAddVipPack }) => {
    const [vipPackage, setVipPackage] = useState({ name: '', price: '', options: '', description: '' });
    const [showToast, setShowToast] = useState(false);
    const [toastMessages, setToastMessages] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setVipPackage({ ...vipPackage, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formattedVipPackage = { ...vipPackage, price: vipPackage.price.replace(/\s/g, '') };
            const response = await addVipPackage(formattedVipPackage);
            if (response.status === 201) {
            await updateAddVipPack();
            setVipPackage({ name: '', price: '', options: '', description: '' });
            setToastMessages((prev) => [...prev, 'Vip Package added successfully!']);
            setShow(false);
            } else {
                setToastMessages((prev) => [...prev, 'Vip Package added failed!']);
            }
        } catch (error) {
            console.error('There was an error adding the category!', error);
            setToastMessages((prev) => [...prev, 'Vip Package added failed!']);
        }
    };

    const formatPrice = (value) => {
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handlePriceChange = (e) => {
        const { value } = e.target;
        const formattedValue = formatPrice(value.replace(/\s/g, ''));
        setVipPackage({ ...vipPackage, price: formattedValue });
    };

    return (
        <>
            <ToastifyMessage messages={toastMessages} onClose={(index) => {
            setToastMessages((prev) => prev.filter((_, i) => i !== index));
            }} />
            <Button onClick={setShow}
                style={{
                    backgroundColor: '#89CFF0', color: 'black',
                    fontWeight: 'bold', fontSize: '15px',
                    marginBottom: '10px', padding: '10px', borderRadius: '10px', border: 'none'
                }}>
                New Vip Package
            </Button>
            
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Vip Package</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                value={vipPackage.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="text"
                                name='price'
                                value={vipPackage.price}
                                onChange={handlePriceChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDuration">
                            <Form.Label>Duration (Month)</Form.Label>
                            <Form.Control
                                as="select"
                                name='options'
                                value={vipPackage.options}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select duration</option>
                                <option value="1">1 Month</option>
                                <option value="6">6 Months</option>
                                <option value="12">12 Months</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name='description'
                                value={vipPackage.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                            <Button variant="primary" type="submit">
                                Save
                            </Button>
                            <Button variant="danger" type="button" onClick={() => setShow(false)}>
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddVipPackage;