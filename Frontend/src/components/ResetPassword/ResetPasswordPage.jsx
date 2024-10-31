import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { resetPassword } from '../../Config/LogInApi';

const ResetPasswordPage = () => {
    const [resetPasswordData, setResetPasswordData] = useState({ newPassword: '', confirmPassword: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResetPasswordData({
            ...resetPasswordData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams(window.location.search);
        const emailParam = encodeURIComponent(params.get('email'));
        const codeParam = encodeURIComponent(params.get('code'));
        console.log('Password reset successfully', resetPasswordData);
        try{
            const response = await resetPassword(emailParam, codeParam, resetPasswordData)
            console.log('api response',response)
        } catch (error) {
            console.log(error);
        }
    }; 

    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6}>
                    <h2>Reset Password</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNewPassword">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='newPassword'
                                placeholder="Enter new password"
                                value={resetPasswordData.newPassword}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='confirmPassword'
                                placeholder="Confirm new password"
                                value={resetPasswordData.confirmPassword}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ResetPasswordPage;