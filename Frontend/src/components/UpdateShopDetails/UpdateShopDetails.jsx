import React, { useState } from 'react';
import { Form, Button, Modal, Toast } from 'react-bootstrap';
import { updateShopDetails } from '../../Config/ShopApi';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { createPortal } from 'react-dom';
import { useAuth } from '../../pages/Login/AuthProvider';

const UpdateShopDetails = ({ shop, setShop, show, handleClose }) => {
    const [shopDetails, setShopDetails] = useState(shop);
    const [file, setFile] = useState(null);
    const [storageRef, setStorageRef] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { user } = useAuth();
    const userId = user.userId;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setShopDetails({ ...shopDetails, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
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
        } else {
            setToastMessage('Please upload a valid image file.');   
            setShowToast(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const previousStorageRef = ref(storage, shop.thumbnail);
        const NotFound = 'others/NotFound.jpg';
        try {
            if (file) {
                await uploadBytes(storageRef, file);
                const newThumbnailUrl = await getDownloadURL(storageRef);
                await updateShopDetails(shopDetails);
                setShop({ ...shopDetails, thumbnail: newThumbnailUrl });
                if (previousStorageRef.fullPath !== NotFound) {                  
                    await deleteObject(previousStorageRef);
                    console.log('Previous image deleted successfully');
                }
            } else {
                await updateShopDetails(shopDetails);
                setShop({ ...shopDetails, thumbnail: previousStorageRef.fullPath });
            }
            setFile(null);
            setPreviewImage(null);
            setToastMessage('Shop details updated successfully!');
            setShowToast(true);
            handleClose();
        } catch (error) {
            console.error('Error updating shop details:', error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Shop Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="updateShopForm" onSubmit={handleSubmit}>
                        <Form.Group controlId="formShopName">
                            <Form.Label>Shop Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter shop name"
                                name="shopName"
                                value={shopDetails.shopName}
                                onChange={handleInputChange}
                                required
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
                                required
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
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group controlId="formShopImage">
                            <Form.Label>Shop Thumbnail</Form.Label>
                            <div>
                                <Form.Control type="file" onChange={handleImageUpload} />
                                {previewImage && <img src={previewImage} alt="Shop" style={{ width: '100px', margin: '5px' }} />}
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" form="updateShopForm" >Update Shop Details</Button>
                </Modal.Footer>
            </Modal>
            {createPortal(
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={5000}
                    autohide
                    bg={toastMessage === 'Please upload a valid image file.' ? 'danger' : 'success'}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 1050,
                    }}
                >
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>,
                document.body
            )}
        </>
    );
};

export default UpdateShopDetails;