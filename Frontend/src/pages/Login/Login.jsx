import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Nav, Container, Col, Row, Image } from 'react-bootstrap';
import { signIn } from '../../Config/LogInApi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Login.css';
import LoginGoogle from './LoginGoogle';
import { useAuth } from './AuthProvider';
import { BiArrowBack } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ConfirmEmail from '../../components/ConfirmEmail/ConfirmEmail';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);
  const [showConfirmLink, setShowConfirmLink] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({ email, password });
      if (response.userId) {
        login({ email, role: response.userRole, userId: response.userId });
        if (response.userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } if (response === 'You must confirm your email before login') {
        setErr(response ? response : 'No response from server');
        setShowConfirmLink(true);
      } else {
        setErr(response ? response : 'No response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErr(err.message || 'Unknown error occurred');
    }
  }

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
            <Image src={logo} alt="FPT TTKoi logo" className="login-logo" fluid />
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
            <Nav className='nav-tabs' variant="tabs" defaultActiveKey="/login" >
              <Nav.Item>
                <Nav.Link href="/login">Log In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/signup" href="/signup">Sign Up</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="createShopAcc" href="/createshopacc">Sign Up as a Shop Owner</Nav.Link>
              </Nav.Item>
            </Nav>
            <Form className='login-form' onSubmit={handleLogin}>
              <Row>
                <Form.Group>
                  <Form.Label className='login-label'>Email</Form.Label>
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
              <Row className='mb-3'>
                <Form.Group>
                  <Form.Label className='login-label'>Password</Form.Label>
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
                <Col className='d-flex justify-content-start'>
                  <Link to='#' className="forgot-password"><p>Forgot password?</p> </Link>
                </Col>
                <Col className='d-flex justify-content-end'>
                  <Button type='submit' className='login-button'>Login</Button>
                </Col>
              </Row>
              {err && <p className="error-message">{err}!</p>}
              {showConfirmLink ? (<Button
                variant='link'
                onClick={() => setShowConfirmEmailModal(true)}
              >Click here to confirm your Email</Button>) : null}
              <p style={{ fontSize: "20px", fontWeight: "bold", textShadow: "black 0 0 1px" }}>Or</p>
              <LoginGoogle />
            </Form>
          </Col>
        </Row>
      </Container>
      <ConfirmEmail
        show={showConfirmEmailModal}
        handleClose={() => setShowConfirmEmailModal(false)}
        email={email}
      />
    </Container >
  );
};

export default Login;