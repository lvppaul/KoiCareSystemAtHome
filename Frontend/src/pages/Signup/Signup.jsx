import React, { useState, useNavigate } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import "./Signup.css";
import { FcGoogle } from "react-icons/fc";
import logo from "../../assets/logo.svg"; // Assuming you want to use the same logo
import { Link } from 'react-router-dom';
import { signUp } from '../../Config/LogInApi';
import { BiArrowBack } from 'react-icons/bi';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [signupError, setSignupError] = useState(null);

    const handleSignup = (e) => {
        e.preventDefault();
        // Handle signup logic here
        const userData = { email, password, confirmPassword, firstname, lastname };
        signUp(userData)
            .then((response) => {
                if (response !== 'Create Account Successfully') {
                    setSignupError(response); // Clear any previous error
                } else {
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setFirstName('');
                    setLastName('');
                    setSignupError(response);
                }
            })
    };

    return (
        <div className='signup-container'>
            <button style={{
                position: 'absolute', top: '10px', left: '0px',
                fontSize: '20px', fontWeight: 'bold',
                width: '200px', height: '50px', backgroundColor: '#FF8433',
                borderTopRightRadius: '25px', borderBottomRightRadius: '25px', border: 'none'
            }}
                onClick={() => { navigate('/') }}>
                <BiArrowBack size={30} style={{ marginRight: '10px' }} />
                Back to home
            </button>
            <div className='signup-form'>
                <img src={logo} alt="FPT TT Koi logo" className="logo" />
                <h2>Create an account</h2>
                {signupError ? (<h3 style={{ color: 'red' }}>{signupError}</h3>) : null}
                <Form onSubmit={handleSignup}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                autoComplete='on'
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
                                autoComplete='on'
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="First name"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <InputGroup>
                            <FormControl
                                type="text"
                                placeholder="Last Name"
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
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