import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { updateShopDetails } from '../../Config/ShopApi';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { useAuth } from '../../pages/Login/AuthProvider';

const UpdateShopDetails = ({ shop, setShop, show, handleClose }) => {
    const [shopDetails, setShopDetails] = useState(shop);
    const [file, setFile] = useState(null);
    const [storageRef, setStorageRef] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const { user } = useAuth();
    const userId = user.userId;

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
            const previewUrl = URL.createObjectURL(file);
            const storageRef = ref(storage, `shop/shopThumbnails/${userId}/${file.name + Date.now()}`);
            try {
                setFile(file);
                setStorageRef(storageRef);
                setPreviewImage(previewUrl);
                setShopDetails({ ...shopDetails, thumbnail: storageRef.fullPath });
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const previousThumbnail = shop.thumbnail;
        try {
            await uploadBytes(storageRef, file);
            const newThumbnailUrl = await getDownloadURL(storageRef);
            await updateShopDetails(shopDetails);
            setShop({...shopDetails, thumbnail: newThumbnailUrl});
            alert('Shop details updated successfully');
            if (previousThumbnail) {
                const previousStorageRef = ref(storage, previousThumbnail);
                await deleteObject(previousStorageRef);
                console.log('Previous image deleted successfully');
            }
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
                            {previewImage && <img src={previewImage} alt="Shop" style={{ width: '100px', marginLeft: '100px' }} />}
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">Update Shop Details</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateShopDetails;