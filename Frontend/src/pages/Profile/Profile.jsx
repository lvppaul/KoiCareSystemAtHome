import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button, Spinner, Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { useAuth } from '../Login/AuthProvider';
import ManageShop from '../ManageShop/ManageShop';
import EditableListItem from '../../components/EditableListItem/EditableListItem';
import { getAccountByUserId, updateAccount, deleteAccount } from '../../Config/UserApi';
import { storage } from '../../Config/firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const Profile = () => {
  const { user } = useAuth();
  const userId = user.userId;
  const logout = useAuth().logout;

  const [details, setDetails] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      const accountDetails = await getAccountByUserId(userId);
      if (accountDetails) {
        if (accountDetails.avatar) {
          try {
            const storageRef = ref(storage, accountDetails.avatar);
            const previewAvatar = await getDownloadURL(storageRef);
            setAvatar(previewAvatar);
          } catch (error) {
            console.error('The file does not exist in firebase anymore!', error);
            const storageRef = ref(storage, 'others/NotFound.jpg');
            const previewAvatar = await getDownloadURL(storageRef);
            setAvatar(previewAvatar);
          }
        } else {
          console.error('No avatar set for this account!');
          const storageRef = ref(storage, 'others/NoAvatar.png');
          const previewAvatar = await getDownloadURL(storageRef);
          setAvatar(previewAvatar);
        }
        setDetails(accountDetails);
      }
      setLoadingAvatar(false);
      setLoadingDetails(false);
    };
    fetchAccountDetails();
  }, [userId]);

  const handleEditClick = async (field) => {
    if (editingField === field) {
      await updateAccount(userId, details);
      setEditingField(null);
    } else {
      setEditingField(field);
    }
  };

  const handleCancelClick = () => {
    setEditingField(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleAvatarChange = async (e) => {
    setLoadingAvatar(true);
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const storageRef = ref(storage, `users/${userId}/userAvatars/${Date.now()}_${file.name}`);
      try {
        const updateStatus = await updateAccount(userId, { ...details, avatar: storageRef.fullPath });
        if (updateStatus === 'Successfully') {
          await uploadBytes(storageRef, file);
          const newAvatar = await getDownloadURL(storageRef);
          setAvatar(newAvatar);
          setLoadingAvatar(false);
        } else {
          console.error('Error updating avatar:', updateStatus);
          setAvatar(null);
          setLoadingAvatar(false);
        }
      } catch (error) {
        console.error('Error uploading avatar:', error);
        setAvatar(null);
        setLoadingAvatar(false);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(userId);
      logout();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <Container className='p-3'>
      <Tabs className='profile-tabs' defaultActiveKey="account" id="profile-tabs">
        <Tab eventKey="account" title="Your Account" style={{ color: 'white' }}>
          <Container className='p-2' style={{ borderRadius: '0 10px 10px 10px', backgroundColor: '#FFFFFF' }}>
            <Row className="mb-3">
              <Col md={4} className="d-flex flex-column align-items-center">
                <div className='mt-5' style={{ width: '250px', height: '250px', border: '5px solid #ddd', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {loadingAvatar ? (
                    <Spinner animation="border" role="status" style={{ color: 'black', width: '3rem', height: '3rem' }} />
                  ) : (
                    <Image
                      style={{ maxBlockSize: '250px', borderRadius: '50%' }}
                      src={avatar}
                      roundedCircle
                      fluid
                    />
                  )}
                </div>
                <input
                  type="file"
                  id="avatarInput"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
                <Button variant="link" onClick={() => document.getElementById('avatarInput').click()}>
                  Change Avatar
                </Button>
                <Button variant="primary" className="mt-5">
                  Upgrade to VIP Account
                </Button>
                <Button variant="danger" className="mt-3" onClick={() => setShowConfirmModal(true)}>
                  Delete Account
                </Button>
              </Col>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3 style={{ fontWeight: 'bolder', textAlign: 'center' }}>Account Details</h3>
                  </ListGroup.Item>
                  {loadingDetails ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ marginTop: '230px', height: '100%' }}>
                      <Spinner animation="border" role="status" style={{ color: 'black', width: '3rem', height: '3rem' }} />
                    </div>
                  ) : (<>
                    <EditableListItem
                      label="First Name"
                      name="firstName"
                      value={details.firstName}
                      isEditing={editingField === 'firstName'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('firstName')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="Last Name"
                      name="lastName"
                      value={details.lastName}
                      isEditing={editingField === 'lastName'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('lastName')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="Sex"
                      name="sex"
                      value={details.sex}
                      isEditing={editingField === 'sex'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('sex')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="Street"
                      name="street"
                      value={details.street}
                      isEditing={editingField === 'street'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('street')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="District"
                      name="district"
                      value={details.district}
                      isEditing={editingField === 'district'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('district')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="City"
                      name="city"
                      value={details.city}
                      isEditing={editingField === 'city'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('city')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="Country"
                      name="country"
                      value={details.country}
                      isEditing={editingField === 'country'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('country')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="Phone Number"
                      name="phoneNumber"
                      value={details.phoneNumber}
                      isEditing={editingField === 'phoneNumber'}
                      handleChange={handleChange}
                      handleEditClick={() => handleEditClick('phoneNumber')}
                      handleCancelClick={handleCancelClick}
                    />
                    <EditableListItem
                      label="Email"
                      name="email"
                      value={details.email}
                      isEditing={false}
                      handleChange={handleChange}
                      handleEditClick={() => { }}
                      handleCancelClick={() => { }}
                      showEditButton={false}
                    />
                  </>
                  )}
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </Tab>
        {user.role === 'shop' && (
          <Tab eventKey="shop" title="Your Shop" style={{ backgroundColor: 'white' }}>
            <Container className='p-2' style={{ borderRadius: '0 10px 10px 10px', backgroundColor: '#FFFFFF' }}>
              <ManageShop />
            </Container>
          </Tab>
        )}
      </Tabs>
      <ConfirmModal
        show={showConfirmModal}
        handleClose={() => setShowConfirmModal(false)}
        handleConfirm={handleDeleteAccount}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </Container>
  );
};

export default Profile;