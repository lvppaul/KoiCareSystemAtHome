import { Button, Modal, Row, Form } from 'react-bootstrap'
import {BiPlus } from 'react-icons/bi'
import { useState } from 'react'
import { useAuth } from '../../pages/Login/AuthProvider'
import { addRecord } from '../../Config/KoiApi'

const AddNewGrowthHistory = ({ show, setShow, koiData, updateAddedGrowth }) => {
    const userId = useAuth().user.userId;
    const initialRecord = { length: '', weight: '', koiId: koiData.koiId, userId: userId, updatedTime:'' };
    const [record, setRecord] = useState(initialRecord);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    }

    const handleSubmitAddNewGrowth = (e) => {
        console.log('koidata', koiData)
        e.preventDefault();
        try {
            const newRecord = {...record, koiId: koiData.koiId, userId: userId}
            addRecord(newRecord)
            .then((response) => {
                console.log('response', response)
                updateAddedGrowth(response)
            })
        } catch (error) {
            console.error('Error adding new growth history:', error);
        } finally {
            setShow(false);
        }
    }
        

  return (
    <>
        <Row className='fish-item' 
            style={{justifyContent:'flex-end', margin:'20px 0'}} >
                <Button  
                onClick={setShow} 
                style={{width:'180px', height:'45px', 
                fontWeight:'bold', fontSize: '14px', 
                borderRadius:'15px', backgroundColor: '#FF8433', transition: 'background-color 0.3s ease'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FF6204'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FF8433'}
                >
                     <BiPlus size={30}/>
                    New Growth
                </Button>
            </Row>

        <Modal show={show} onHide={() => setShow(false)} size='xs' >
            <Modal.Header closeButton>
                <Modal.Title>Add New Growth History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmitAddNewGrowth}>
                    <Form.Group controlId="formDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                        name='updatedTime'
                        value={record.updatedTime}
                        type="date"
                        onChange={handleChange}/>
                    </Form.Group>
                    <Form.Group controlId="formLength">
                        <Form.Label>Length (cm)</Form.Label>
                        <Form.Control 
                        name='length'
                        value={record.length}
                        type="number" 
                        onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="formWeight">
                        <Form.Label>Weight (g)</Form.Label>
                        <Form.Control 
                        name='weight'
                        value={record.weight}
                        type="number" 
                        onChange={handleChange}/>
                    </Form.Group>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" type='submit'>
                    Save
                </Button>
                </Form>
            </Modal.Body>
            
            
        </Modal>
    </>
  )
}

export default AddNewGrowthHistory