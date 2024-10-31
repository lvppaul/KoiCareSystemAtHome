import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { resetPassword } from '../../Config/LogInApi';
import { BiCheckCircle } from 'react-icons/bi';
import background from '../../assets/images/login-bg.png'
const ResetPasswordPage = () => {
    const [resetPasswordData, setResetPasswordData] = useState({ newPassword: '', confirmPassword: '' });

    const [message, setMessage] = useState('');
    const [resetPasswordState, setResetPasswordState] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setResetPasswordData({
            ...resetPasswordData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const emailParam = encodeURIComponent(params.get('email'));
        const codeParam = encodeURIComponent(encodeURIComponent(params.get('code')));
        try{
            const response = await resetPassword(emailParam, codeParam, resetPasswordData)
            if (response.status === 200) {
                setResetPasswordState(true) 
            } else {
                setResetPasswordState(false)
                setMessage(response.data)
            } 
        } catch (error) {
            setResetPasswordState(false);
        } finally {
            setLoading(false);
        }
    }; 

    return (
        <Container fluid style={{
            background: `url(${background}) repeat center center fixed`,
            display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', minHeight:'100vh'}} >
                {resetPasswordState ? 
                    <>
                    <Container style={{
                        backgroundColor:'#fff', borderRadius:'20px', minHeight:"35vh", maxWidth:'30vw',
                        display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center'}}>
                        <h1>Reset Password</h1>
                        <BiCheckCircle size={100} color='green'/>
                        <p>Password Change Successfull. You can close this tab</p>
                    </Container>
                    </> 
                    :
                    <Container style={{
                        backgroundColor:'#fff', borderRadius:'20px', minHeight:"40vh", maxWidth:'40vw',
                        background:'rgba(255, 255, 255, 0.8)', 
                        display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center' 
                        }}>
                    <Form onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>
                        {message}
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
                        {loading ? 
                        <Spinner size={30} />
                        :
                        <Button variant="primary" type="submit">
                            Reset Password
                        </Button>
                        }
                    </Form>
                    </Container>
                }
        </Container>
    );
};

export default ResetPasswordPage;