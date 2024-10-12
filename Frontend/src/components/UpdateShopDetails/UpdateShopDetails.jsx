import React, { useState } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import { updateShopDetails } from '../../Config/ShopApi';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../Config/firebase';


const UpdateShopDetails = ({ shop, setShop, show, handleClose }) => {
    const [shopDetails, setShopDetails] = useState(shop);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShopDetails({ ...shopDetails, [name]: value });
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const storageRef = ref(storage, `shop/shopThumbnails/${file.name}`);
            try {
                await uploadBytes(storageRef, file);
                const imageUrl = await getDownloadURL(storageRef);
                setShopDetails({ ...shopDetails, picture: imageUrl });
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateShopDetails(shopDetails);
            setShop(shopDetails);
            alert('Shop details updated successfully');
            handleClose();
        } catch (error) {
            console.error('Error updating shop details:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Shop Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formShopName">
                        <Form.Label>Shop Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter shop name"
                            name="shopName"
                            value={shopDetails.shopName}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formShopDescription">
                        <Form.Label>Shop Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter shop description"
                            name="description"
                            value={shopDetails.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formShopPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            name="phone"
                            value={shopDetails.phone}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formShopEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={shopDetails.email}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formShopImage">
                        <Form.Label>Shop Image</Form.Label>
                        <div>
                            <Button variant="secondary" onClick={handleImageUpload}>Upload Image</Button>
                            {shopDetails.picture && <img src={shopDetails.picture} alt="Shop" style={{ width: '100px', marginLeft: '10px' }} />}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">Update Shop Details</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateShopDetails;