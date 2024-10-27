import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Image, Nav, Form, InputGroup, FormControl, Spinner } from 'react-bootstrap';
import ConfirmEmail from '../../components/ConfirmEmail/ConfirmEmail';
import logo from "../../assets/Fpt_TTKoi_logo.svg";
import './CreateShopAcc.css';
import { getUserIdByEmail, signUpShop, deleteAccount } from '../../Config/LogInApi';
import { addShop } from '../../Config/ShopApi';
import { BiArrowBack } from 'react-icons/bi';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function CreateShopAcc() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [shopName, setShopName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('This is your shop description');
    const [createShopError, setCreateShopError] = useState(null);
    const [createShopSuccess, setCreateShopSuccess] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleCreateShop = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userData = { email, password, confirmPassword, firstName, lastName };
        if (password !== confirmPassword) {
            setCreateShopError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const signUpResponse = await signUpShop(userData);

            if (signUpResponse === 200) {
                const userIdResponse = await getUserIdByEmail(email);
                setCreateShopError(null);
                setCreateShopSuccess(signUpResponse);
                const thumbnail = 'others/NotFound.jpg';
                const rating = 0;
                const shopData = { userId: userIdResponse, shopName, description, phone, email, rating, thumbnail };
                console.log('shop:', shopData);
                try {
                    const addShopResponse = await addShop(shopData);

                    if (addShopResponse.shopId) {
                        setShowConfirmEmailModal(true);
                    } else {
                        setCreateShopError(addShopResponse.error);
                        await deleteAccount(userIdResponse);
                    }
                } catch (error) {
                    if (error.message === 'Request failed with status code 422') {
                        setCreateShopError('Shop name already taken');
                        await deleteAccount(userIdResponse);
                    } else {
                        setCreateShopError(error.message);
                        await deleteAccount(userIdResponse);
                    }
                }
            } else {
                console.log('Error create account:', signUpResponse);
                setCreateShopError(signUpResponse);
            }
        } catch (error) {
            console.error('Error during shop account creation:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fluid className="createShop-container vh-100">
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
            <Container className='d-flex flex-row justify-content-between'>
                <Row className='d-flex justify-content-between align-items-center'>
                    <Col md={6} className='d-flex flex-column align-items-center justify-content-center me-4'>
                        <Image src={logo} alt="FPT TTKoi logo" className="createShop-logo" fluid />
                        <h1 className='fw-bold' style={{ color: "#D6691E" }}>Welcome to FPT TTKoi</h1>
                        <div className='text-dark fs-5 fw-bold text-center'>
                            <p>
                                Become a shop owner with FPT TTKoi and connect with a broader audience looking for quality koi products.
                            </p>
                            <p>
                                Expand your business online and make your products more accessible to customers, driving growth and success.
                            </p>
                        </div>
                    </Col>
                    <Col md={5} className='ms-4'>
                        <Nav className='nav-tabs' variant="tabs" defaultActiveKey="/createshopacc">
                            <Nav.Item>
                                <Nav.Link eventKey="/login" href='/login'>Log In</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="/signup" href="/signup">Sign Up</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/createshopacc">Sign Up as a Shop Owner</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Form className='createShop-form' onSubmit={handleCreateShop}>
                            <Row>
                                <Col md={12}>
                                    <Row>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className='createShop-label'>First Name</Form.Label>
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
                                            <Form.Group>
                                                <Form.Label className='createShop-label'>Last Name</Form.Label>
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
                                            <Form.Group>
                                                <Form.Label className='createShop-label'>Email</Form.Label>
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
                                                <Form.Label className='createShop-label'>Password</Form.Label>
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
                                            <Form.Group>
                                                <Form.Label className='createShop-label'>Confirm Password</Form.Label>
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
                                        </Col>
                                        <Col md={6}>
                                            <Form.Group>
                                                <Form.Label className='createShop-label'>Shop Name</Form.Label>
                                                <InputGroup>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Shop Name"
                                                        value={shopName}
                                                        onChange={(e) => setShopName(e.target.value)}
                                                        required
                                                        autoComplete='shop-name'
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className='createShop-label'>Phone</Form.Label>
                                                <InputGroup>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="Phone"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        required
                                                        autoComplete='tel'
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group>
                                                <Form.Label className='createShop-label'>Description</Form.Label>
                                                <InputGroup>
                                                    <FormControl
                                                        as="textarea"
                                                        rows="4"
                                                        placeholder="Description"
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        autoComplete='description'
                                                    />
                                                </InputGroup>
                                            </Form.Group>
                                            <Col className='d-flex justify-content-end mt-4'>
                                                <Button type='submit' className='create-button' disabled={loading}>
                                                    {loading ? <Spinner animation="border" size="sm" /> : 'Create'}
                                                </Button>
                                            </Col>
                                        </Col>
                                    </Row>
                                    {createShopError && <p className="error-message mt-3">{createShopError}</p>}
                                    {createShopSuccess && <p className="success-message mt-3">{createShopSuccess}</p>}
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <ConfirmEmail
                show={showConfirmEmailModal}
                handleClose={() => setShowConfirmEmailModal(false)}
                email={email}
            />
        </Container>
    );
};

export default CreateShopAcc;