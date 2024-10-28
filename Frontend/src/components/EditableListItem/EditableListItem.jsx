import React from 'react';
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const EditableListItem = ({ label, name, value, isEditing, handleChange, handleEditClick, handleCancelClick, showEditButton = true }) => (
  <ListGroup.Item className='p-3'>
    <Row className='d-flex align-items-center justify-content-between'>
      <Col md={3} className='d-flex justify-content-start'>
        <strong>{label}:</strong>
      </Col>
      <Col>
        {isEditing ? (
          <Form.Control
            type="text"
            name={name}
            value={value}
            onChange={handleChange}
          />
        ) : (
          ` ${value}`
        )}
      </Col>
      {showEditButton && (
        <Col md={3} className='d-flex justify-content-end'>
          {isEditing ? (
            <>
              <Button variant="dark" style={{color: 'white'}} onClick={handleEditClick} >
                Save
              </Button>
              <Button variant="link" style={{color: 'black'}} onClick={handleCancelClick} >
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="link" style={{color: 'black'}} onClick={handleEditClick} className="me-5">
              Edit
            </Button>
          )}
        </Col>
      )}
    </Row>
  </ListGroup.Item>
);

export default EditableListItem;