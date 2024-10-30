import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { addCategories } from '../../Config/CategoryApi';

const AddCategories = ({ show, setShow, updateAddCategories }) => {
    const [categories, setCategories] = useState({name: '', description: ''});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategories({ ...categories, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addCategories(categories);
            alert('Category added successfully');
            updateAddCategories();
            setShow(false);
        } catch (error) {
            console.error('There was an error adding the category!', error);
        }
    };


    return (
        <>
            <Button onClick={setShow}
                style={{
                    backgroundColor: '#89CFF0', color: 'black',
                    fontWeight: 'bold', fontSize: '15px',
                    marginBottom: '10px', padding: '10px', borderRadius: '10px', border: 'none'
                }}>
                Add Categories
            </Button>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name='name'
                                value={categories.name}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formCategoryDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name='description'
                                value={categories.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <div style={{display:'flex',justifyContent:'flex-end', marginTop:'20px'}}>
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

export default AddCategories;