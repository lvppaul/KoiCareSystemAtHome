import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup, FormControl, Nav } from 'react-bootstrap';
import { signIn } from '../../Config/LogInApi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Login.css';
import LoginGoogle from './LoginGoogle';
import { useAuth } from './AuthProvider';
import { BiArrowBack } from 'react-icons/bi';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthProvider
  const [err, setErr] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await signIn({ email, password });
      if (response) {
        login({ email, role: response.userRole, userId: response.userId });
        if (response.userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setErr(response ? response.message : 'No response from server');
      }
    } catch (err) {
      console.error('Login error:', err);
      setErr(err.message || 'Unknown error occurred');
    }
  }

  const description = `Our website will provide the best solution to help Koi enthusiasts
    manage and care for your Koi fish at home.
    We provide a range of features to monitor, track and maintain
    optimal conditions for Koi ponds and fish health.`;

  return (
    <div className='login-container'>
      
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

      <img src={logo} alt="FPT TTKoi logo" className="logo" />
        <h2>Login to FPT TTKoi</h2>
        <p className="description">{description}</p>

      <Nav variant="tabs" defaultActiveKey="/login" className="mb-3">
        <Nav.Item>
          <Nav.Link href="/login">Log In</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/signup" href="/signup">Sign Up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="signupshop" href="/signupshop">Sign Up as a Shop Owner</Nav.Link>
        </Nav.Item>
      </Nav>

      <div className='login-form'>
        {err && <p className="error-message">{err}</p>}
        <Form onSubmit={handleLogin}>
          <Form.Group>
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
          <Form.Group>
            <InputGroup>
              <FormControl
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='current-password'
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <div className="form-actions row">
              <div className="col-md-6">
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
              <div className="col-md-6">
                <Button type='submit' className='login-button'>Login</Button>
              </div>
            </div>
          </Form.Group>
        </Form>
        <div className="create-account">
          <Link to="/signup">
            <p>CREATE AN ACCOUNT</p>
          </Link>
          <p>Or</p>
          <LoginGoogle />
        </div>
      </div>
    </div>
  )
}

export default Login;