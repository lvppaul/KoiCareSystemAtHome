import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginNeeded = ({ show, handleClose }) => {
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate('/login');
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Access denied</Modal.Title>
      </Modal.Header>
      <Modal.Body>You need to login to use this action</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleNavigateToLogin}>
          Proceed to login
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginNeeded;
