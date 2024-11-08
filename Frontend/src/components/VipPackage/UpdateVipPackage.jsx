import React, { useState, useEffect, useContext } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { updateVipPackage } from '../../Config/VipPackageApi';
import { ToastContext } from "../../App";

const UpdateVipPackage = ({ show, setShow, vipPackData, fetchVipPackages }) => {
  const [vipPack, setVipPack] = useState(vipPackData || {}); 
  const { setToastMessages } = useContext(ToastContext);

  useEffect(() => {
    setVipPack(vipPackData);
  }, [vipPackData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVipPack((prevVipPack) => ({
      ...prevVipPack,
      [name]: value,
    }));
  };
  const handleClose = () => setShow(false);
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(vipPack);
      const response = await updateVipPackage(vipPack.vipId, vipPack);
      if (response.status === 204) {
        await fetchVipPackages();
        setToastMessages("VIP Package updated successful !");
        handleClose()
      } else {
        setToastMessages("Failed to update VIP Package");
        handleClose()
      }
    } catch (error) {
      console.error('There was an error updating the VIP Package!', error);
      setToastMessages("Error updating VIP Package");

    }
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const formattedValue = value.replace(/\s/g, ''); // Remove spaces
    setVipPack((prevVipPack) => ({
      ...prevVipPack,
      price: formattedValue,
    }));
  };

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update VIP Package</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitUpdate}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={vipPack.name || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={vipPack.price || ''}
                onChange={handlePriceChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formDuration">
              <Form.Label>Duration (Month)</Form.Label>
              <Form.Control
                as="select"
                name="options"
                value={vipPack.options || ''}
                onChange={handleInputChange}
                required
              >
                <option value="1">1 Month</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={vipPack.description || ''}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Button variant="danger" type="button" onClick={() => setShow(false)} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateVipPackage;
