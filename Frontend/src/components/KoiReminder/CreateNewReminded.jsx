import { useContext, useEffect, useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useAuth } from '../../pages/Login/AuthProvider'
import { createKoiRemind } from '../../Config/KoiRemind';
import { ToastContext } from '../../App';
import { getKoiByUserId } from '../../Config/KoiApi';

const CreateNewReminded = ({ show, setShow , koiId, updateKoiReminder }) => {   
    const {setToastMessage} = useContext(ToastContext);
    const userId = useAuth().user.userId;
    const [koiList, setKoiList] = useState([]);
    const [reminderData, setReminderData] = useState({ userId: userId, koiId: '', dateRemind: '', remindDescription: '' });
    const [koiDetailRemind, setKoiDetailRemind] = useState({
        ...reminderData, 
        koiId: koiId
      });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setReminderData({ ...reminderData, [name]: value });
    };

    useEffect(() => {
        getKoiByUserId(userId).then((data) => {
            setKoiList(data);
        }
        );
        if (koiId) {
            setReminderData(prev => ({
                ...prev,
                koiId: koiId
            }));
        }
    }, [koiId]);

    const handleCreateRemind = async (event) => {
        event.preventDefault();
        console.log('reminderData', reminderData);
        
        try {
            const response = await createKoiRemind(reminderData);
            if (response) {
                setToastMessage('Create reminder successfully');
                setReminderData(reminderData);
                if(koiId) {
                    await updateKoiReminder(koiId);
                }
            } else {
                setToastMessage('Create reminder failed'); 
            }
        } catch (error) {
            console.error('Error creating reminder:', error);
            setToastMessage('Create reminder failed');
        }
        setReminderData({ userId: userId, koiId: '', dateRemind: '', remindDescription: '' });
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
                        {!koiId ? <>
                        <Form.Label>Koi Name</Form.Label>
                        <Form.Control as="select" name="koiId" value={reminderData.koiId} onChange={handleInputChange}>
                            <option value="">Select Koi</option>
                            {koiList.map((koi) => (
                                <option key={koi.koiId} value={koi.koiId}>{koi.name}</option>
                            ))}
                        </Form.Control>
                        </>
                        : null 
                        }
                    </Form.Group>
                    
                    <Form.Group controlId="dateRemind">
                        <Form.Label>Date Remind</Form.Label>
                        <Form.Control type="date" name="dateRemind" value={reminderData.dateRemind} onChange={handleInputChange} />
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