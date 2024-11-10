import { useContext, useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../pages/Login/AuthProvider';
import { updateKoiRemind } from '../../Config/KoiRemind';
import { ToastContext } from '../../App';

const UpdateKoiReminder = ({ show, setShow, reminder, updateKoiReminder }) => {
    const { setToastMessage } = useContext(ToastContext);
    const userId = useAuth().user.userId;
    const [reminderData, setReminderData] = useState(reminder);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReminderData({ ...reminderData, [name]: value });
    };

    const handleUpdateRemind = async (event) => {
        event.preventDefault();
        console.log('reminderData', reminderData);

        try {
            await updateKoiRemind(reminderData.remindId, reminderData)
            .then(() => {
                setToastMessage('Update reminder successfully');
                updateKoiReminder(reminderData.koiId);
            }) 
        } catch (error) {
            console.error('Error updating reminder:', error);
            setToastMessage('Update reminder failed');
        }
        setShow(false);
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Update Reminder</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleUpdateRemind}>
                    <Form.Group controlId="remindDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" name="dateRemind" value={reminderData.dateRemind} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="remindDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name="remindDescription" value={reminderData.remindDescription} onChange={handleInputChange} />
                    </Form.Group>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginBlockStart: '10px' }}>
                        <Button type="submit" className="btn btn-primary" style={{ marginInlineEnd: '10px' }}>Update</Button>
                        <Button onClick={() => setShow(false)} className="btn btn-secondary">Cancel</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateKoiReminder;