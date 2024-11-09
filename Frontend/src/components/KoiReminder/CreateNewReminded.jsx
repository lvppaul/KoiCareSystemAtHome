import { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../pages/Login/AuthProvider'
import { createKoiRemind } from '../../Config/KoiRemind';
import { ToastifyMessage } from '../Toastify/ToastifyModel';

const CreateNewReminded = ({ show, setShow, koiList }) => {
    const userId = useAuth().user.userId;
    const createDate = new Date().toISOString();
    console.log('createDate:', createDate);
    const [reminderData, setReminderData] = useState({ userId: userId, koiId: '', dateRemind: createDate, remindDescription: '' });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReminderData({ ...reminderData, [name]: value });
    };

    const handleCreateRemind = async (event) => {
        event.preventDefault();
        try {
            const response = await createKoiRemind(reminderData);
            response.status === 201 ? 
            ToastifyMessage('success', 'Create reminder successfully') :
            ToastifyMessage('error', 'Create reminder failed'); 
        } catch (error) {
            console.error('Error creating reminder:', error);
            ToastifyMessage('error', 'Create reminder failed');
        }
        setShow(false);
    }
    return (
        <Modal show={show} onHide={() => setShow(false)} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Create New Reminder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleCreateRemind}>
                    <Form.Group controlId="koiId">
                        <Form.Label>Koi Name</Form.Label>
                        <Form.Control as="select" name="koiId" value={reminderData.koiId} onChange={handleInputChange}>
                            <option value="">Select Koi</option>
                            {koiList.map((koi) => (
                                <option key={koi.koiId} value={koi.koiId}>{koi.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="remindDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="remindDescription" value={reminderData.remindDescription} onChange={handleInputChange} />
                    </Form.Group>
                    <div style={{display:'flex', justifyContent:'flex-end', alignItems:'flex-end', marginBlockStart:'10px'}}>
                    <Button type="submit" className="btn btn-primary" style={{marginInlineEnd:'10px'}}>Create</Button>
                    <Button onClick={() => setShow(false)} className="btn btn-secondary">Cancel</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default CreateNewReminded