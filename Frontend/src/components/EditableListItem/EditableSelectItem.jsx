import React from 'react';
import { Row, Col, Form, ListGroup } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';

const EditableSelectItem = ({ label, name, value, handleChange, options }) => (
  <ListGroup.Item className='p-3'>
    <Row className='d-flex align-items-center justify-content-between'>
      <Col md={3} className='d-flex justify-content-start'>
        <strong>{label}:</strong>
      </Col>
      <Col className='position-relative'>
        <Form.Control
          as="select"
          name={name}
          value={value}
          onChange={handleChange}
          style={{ appearance: 'none', paddingRight: '2rem' }}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value} disabled={option.value === ""}>
              {option.label}
            </option>
          ))}
        </Form.Control>
        <FaChevronDown style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
      </Col>
      <Col md={5} className='d-flex justify-content-end'> 
        {/* Remove edit and cancel buttons */}
      </Col>
    </Row>
  </ListGroup.Item>
);

export default EditableSelectItem;
