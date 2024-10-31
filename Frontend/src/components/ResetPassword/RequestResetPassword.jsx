import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { BiCheckCircle } from 'react-icons/bi'
import { requestResetPassword } from '../../Config/LogInApi'


const RequestResetPassword = ({show, setShow}) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [resetPasswordState, setResetPasswordState] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setResetPasswordState(false)
    }
    const handleSubmitResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Reset password request submitted', email);
            const response = await requestResetPassword(email);
            if (response === 200) {
                setResetPasswordState(true)
            } else {
            setResetPasswordState(false)
            setMessage("reset password fail check your email input")
            }
        } catch {
            setResetPasswordState(false);
        } finally {
            setLoading(false);
        }
    }
  return (
    <>
    <Link as Button onClick={() => setShow(true)} className="forgot-password"><p>Forgot password?</p> </Link>

    <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
            <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {resetPasswordState ?
            <>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <BiCheckCircle size={100} color='green'/>
                <p>We already sent a link reset password to your mail</p>
            </div>
            </>
            :
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                {message ? 
                <p>{message}</p> : null}
                <Form.Control 
                type="email"
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
            {loading ? 
            <Spinner size={30}/>
            :
            <Button variant="primary" onClick={handleSubmitResetPassword} >
                Submit
            </Button>
            }
            </div>
            </Form>
        }
        </Modal.Body>
    </Modal>
    </>
  )
}

export default RequestResetPassword