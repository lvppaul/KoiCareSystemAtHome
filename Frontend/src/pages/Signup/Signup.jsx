import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.svg"; // Assuming you want to use the same logo
import {Link} from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSignup = (e) => {
        e.preventDefault();
        // Handle signup logic here
    };

    return (
        <div className='signup-container'>
            <div className='signup-form'>
                <img src={logo} alt="FPT TT Koi logo" className="logo" />
                <h2>Create an account</h2>
                
                <Form onSubmit={handleSignup}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <FormControl 
                                type="text" 
                                placeholder="Username" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required 
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <InputGroup>
                            <FormControl 
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <InputGroup>
                            <FormControl 
                                type="password" 
                                placeholder="Confirm Password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required 
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <FormControl 
                                type="email" 
                                placeholder="Email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formPhone">
                        <Form.Label>Phone number</Form.Label>
                        <InputGroup>
                            <FormControl 
                                type="tel" 
                                placeholder="Phone number" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required 
                            />
                        </InputGroup>
                    </Form.Group>
                    <Button type='submit' className='create-button'>Create</Button>
                </Form>
                <div className="login-link">
                    <p>HAVE AN ACCOUNT? <Link to="/login">LOGIN</Link></p>
                    <p>Or</p>
                  <Button className="google-login">
                  <FcGoogle size={24} />
                    Login with Google
                  </Button>
                </div>
            </div>
        </div>
    );
}

export default Signup;