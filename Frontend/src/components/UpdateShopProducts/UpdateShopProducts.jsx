import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdateShopProducts = ({ product, show, handleClose, handleUpdate }) => {
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const handleSubmit = () => {
        handleUpdate(updatedProduct);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formProductName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductQuantity">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                            type="number"
                            name="quantity"
                            value={updatedProduct.quantity}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formProductStatus">
                        <Form.Check
                            type="checkbox"
                            label="Available"
                            name="status"
                            checked={updatedProduct.status}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, status: e.target.checked })}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UpdateShopProducts;