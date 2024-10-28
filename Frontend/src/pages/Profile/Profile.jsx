import React, { useState } from 'react';
import { Tabs, Tab, Form, Button, Container, Row, Col, Image, Modal } from 'react-bootstrap';
import { useAuth } from '../Login/AuthProvider';
import ManageShop from '../ManageShop/ManageShop';

const Profile = () => {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [accountDetails, setAccountDetails] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    sex: user.sex,
    street: user.street,
    district: user.district,
    city: user.city,
    country: user.country,
    phoneNumber: user.phoneNumber,
  });
  const [showModal, setShowModal] = useState(false);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAccountDetails({ ...accountDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to update account details
    console.log('Account details updated:', accountDetails);
    setShowModal(false);
  };

  return (
    <Container>
      <Tabs defaultActiveKey="account" id="profile-tabs">
        <Tab eventKey="account" title="Your Account">
          <Row className="mb-3">
            <Col md={4}>
              <Image src={avatar} roundedCircle fluid />
            </Col>
            <Col md={8}>
              <p><strong>First Name:</strong> {accountDetails.firstName}</p>
              <p><strong>Last Name:</strong> {accountDetails.lastName}</p>
              <p><strong>Sex:</strong> {accountDetails.sex}</p>
              <p><strong>Street:</strong> {accountDetails.street}</p>
              <p><strong>District:</strong> {accountDetails.district}</p>
              <p><strong>City:</strong> {accountDetails.city}</p>
              <p><strong>Country:</strong> {accountDetails.country}</p>
              <p><strong>Phone Number:</strong> {accountDetails.phoneNumber}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Update Account
              </Button>
            </Col>
          </Row>
        </Tab>
        {user.role === 'shop' && (
          <Tab eventKey="shop" title="Your Shop">
            <ManageShop />
          </Tab>
        )}
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Change Avatar</Form.Label>
              <Form.Control type="file" onChange={handleAvatarChange} />
            </Form.Group>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={accountDetails.firstName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={accountDetails.lastName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSex" className="mb-3">
              <Form.Label>Sex</Form.Label>
              <Form.Control
                type="text"
                name="sex"
                value={accountDetails.sex}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStreet" className="mb-3">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                name="street"
                value={accountDetails.street}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDistrict" className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                name="district"
                value={accountDetails.district}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCity" className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={accountDetails.city}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCountry" className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={accountDetails.country}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formPhoneNumber" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={accountDetails.phoneNumber}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                readOnly
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profile;