import { useState } from 'react'
// import { login } from "../../axiosConfig";
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import logo from "../../assets/logo.svg"
import { FcGoogle } from "react-icons/fc";
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [err, setErr] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const handleLogin = async (e) => {
    //     e.preventDefault(); // Prevent default form submission
    //     try {
    //         const response = await login(username, password);
            
    //         if (response && response.success) {
    //             // Redirect to Home page
    //             navigate('/');
    //         } else {
    //             setErr(response ? response.message : 'No response from server');
    //         }
    //     } catch (err) {
    //         console.error('Login error:', err);
    //         setErr(err.message || 'Unknown error occurred');
    //     }
    // }
    
    const description = `Our website will provide the best solution to help Koi enthusiasts
    manage and care for your Koi fish at home.
    We provide a range of features to monitor, track and maintain\n
    optimal conditions for Koi ponds and fish health.`

    return (
      <div className='login-container'>
      <div className='login-form'>
        <img src={logo} alt="FPT TT Koi logo" className="logo" />
        <h2>Login to FPT TT Koi</h2>
        <p className="description">{description}</p>
        
        {err && <p className="error-message">{err}</p>}
        <Form> 
        {/* onSubmit={handleLogin} */}
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
        <a href="#">
          <p>CREATE AN ACCOUNT</p>
        </a>
        <p>Or</p>
        <Button className="google-login">
          <FcGoogle size={24} />
          Login with Google
        </Button>
        </div>
      </div>
      </div>
    )
}

export default Login