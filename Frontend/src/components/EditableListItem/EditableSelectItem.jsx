import React from 'react';
import { Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const EditableSelectItem = ({ label, name, value, isEditing, handleChange, handleEditClick, handleCancelClick, options }) => (
  <ListGroup.Item className='p-3'>
    <Row className='d-flex align-items-center justify-content-between'>
      <Col md={3} className='d-flex justify-content-start'>
        <strong>{label}:</strong>
      </Col>
      <Col>
        {isEditing ? (
          <Form.Control
            as="select"
            name={name}
            value={value}
            onChange={handleChange}
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        ) : (
          ` ${value}`
        )}
      </Col>
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
    </Row>
  </ListGroup.Item>
);

export default EditableSelectItem;
