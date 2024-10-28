import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ConfirmEmail = ({ show, handleClose, email }) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Your Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='mb-3'>
                    <Form.Text className='mb-5' style={{ fontWeight: 'bold' }} >
                        A confirmation email has been sent to your email.
                        Please follow the link sent in the email to confirm your email.
                    </Form.Text>
                    <Form.Group className='mt-3 mb-3'>
                        <Form.Label style={{ fontWeight: 'bold' }}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            readOnly
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmEmail;