import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Image, Nav, Form, InputGroup, FormControl } from 'react-bootstrap';

import logo from "../../assets/logo.svg";
import { Link } from 'react-router-dom';
import { signUp } from '../../Config/LogInApi';
import { BiArrowBack } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


function CreateShopAcc() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [signupError, setSignupError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        const userData = { email, password, confirmPassword, firstName, lastName };
        if(password !== confirmPassword) {
            setSignupError('Passwords do not match');
            return;
        }
        signUp(userData)
            .then((response) => {
                if (response !== 200) {
                    setSignupError(response);
                } else {
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setFirstName('');
                    setLastName('');
                    navigate('/login');
                }
            })
            .catch((error) => {
                setSignupError(error.message);
            });
    };

    return (
        <Container fluid className="login-container vh-100">
            <Button
                variant="light"
                className="position-absolute"
                style={{
                    backgroundColor: '#E47E39',
                    top: '10px',
                    left: '0px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    width: '200px',
                    height: '50px',
                    borderTopRightRadius: '25px',
                    borderBottomRightRadius: '25px',
                    border: 'none'
                }}
                onClick={() => navigate('/')}
            >
                <BiArrowBack size={30} className="me-2" />
                Back to home
            </Button>
            <Container className='d-flex flex-row justify-content-between '>
                <Row className='d-flex justify-content-between align-items-center'>
                    <Col md={6} className='d-flex flex-column align-items-center justify-content-center me-4'>
                        <Image src={logo} alt="FPT TTKoi logo" className="sigup-logo" fluid />
                        <h1 className=' fw-bold' style={{ color: "#D6691E" }}>Welcome to FPT TTKoi</h1>
                        <div className='text-dark fs-5 fw-bold text-center'>
                            <p>
                                Our website will provide the best solution to help Koi enthusiasts manage and care for your Koi fish at home.
                            </p>
                            <p>
                                We provide a range of features to monitor, track and maintain optimal conditions for Koi ponds and fish health.
                            </p>
                        </div>
                    </Col>
                    <Col md={5} className='ms-4'>
                        <Nav className='nav-tabs' variant="tabs" defaultActiveKey="/signup" >
                            <Nav.Item>
                                <Nav.Link eventKey="/login" href='/login'>Log In</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/signup">Sign Up</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="signupshop" href="/signupshop">Sign Up as a Shop Owner</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Form className='signup-form' onSubmit={handleSignup}>
                            <Row>
                                <Form.Group>
                                    <Form.Label className='signup-label'>First Name</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                            autoComplete='given-name'
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label className='signup-label'>Last Name</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="text"
                                            placeholder="Last Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                            autoComplete='family-name'
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label className='signup-label'>Email</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete='email'
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label className='signup-label'>Password</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete='current-password'
                                            style={{ borderRadius: '5px' }}
                                        />
                                        <div
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-70%)',
                                                cursor: 'pointer',
                                                zIndex: 1,
                                            }}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className='mb-3'>
                                <Form.Group>
                                    <Form.Label className='signup-label'>Confirm Password</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            autoComplete='current-password'
                                            style={{ borderRadius: '5px' }}
                                        />
                                        <div
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '50%',
                                                transform: 'translateY(-70%)',
                                                cursor: 'pointer',
                                                zIndex: 1,
                                            }}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                            </Row>
                            <Row className='already mb-3'>
                                <Col className='d-flex flex-column justify-content-start'>
                                    <p className='mb-0'>Already have an account? </p>
                                    <Link to='/login' style={{ color: '#D6691E' }}>Log in</Link>
                                </Col>
                                <Col className='d-flex justify-content-end'>
                                    <Button type='submit' className='create-button'>Create</Button>
                                </Col>
                            </Row>
                            {signupError && <p className="error-message">{signupError}</p>}
                            <p style={{ fontSize: "20px", fontWeight: "bold", textShadow: "black 0 0 1px" }}>Or</p>
                            
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container >
    );
};

export default CreateShopAcc;