import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { confirmEmail } from '../../Config/LogInApi';
import { useNavigate } from 'react-router-dom';

const ConfirmEmail = ({ show, handleClose, email }) => {
    const navigate = useNavigate();
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [error, setError] = useState('');

    const handleCodeChange = (e) => {
        setConfirmationCode(e.target.value);
    };

    const handleConfirm = async () => {
        try {
            const response = await confirmEmail(email, confirmationCode);
            if (response === 200) {
                setIsConfirmed(true);
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setError(response);
            }
        } catch (error) {
            console.error('Error during email confirmation:', error);
            setError(error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Your Email</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {isConfirmed ? (
                    <p>Your email has been confirmed! Proceeding to login</p>
                ) : (
                    <Form className='mb-3'>
                        <Form.Text className='mb-5' style={{fontWeight: 'bold'}} >
                            A confirmation code has been sent to your email.
                            Please enter the code below to confirm your email.
                        </Form.Text>
                        <Form.Group className='mt-3 mb-3'>
                            <Form.Label style={{fontWeight: 'bold'}}>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{fontWeight: 'bold'}}>Confirmation Code</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter confirmation code"
                                value={confirmationCode}
                                onChange={handleCodeChange}
                            />
                        </Form.Group>
                    </Form>
                )}
                {error && <p className="error-message">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                {!isConfirmed && (
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm Email
                    </Button>
                )}
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmEmail;