import { useState, useEffect } from 'react';
import { Button, Modal, Form, Spinner } from 'react-bootstrap';
import { useAuth } from '../../pages/Login/AuthProvider';
import { updateKoiRecord } from '../../Config/KoiApi';

const UpdateGrowthHistory = ({ show, setShow, growthRecord, updateGrowthRecord }) => {
    const userId = useAuth().user.userId;
    const [record, setRecord] = useState(growthRecord || {});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setRecord(growthRecord || {});
    }, [growthRecord]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    const handleSubmitUpdateGrowth = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updatedRecord = { ...record, userId: userId };
            await updateKoiRecord(updatedRecord);
            updateGrowthRecord(updatedRecord);
            setLoading(false);
            setShow(false);
        } catch (error) {
            console.error('Error updating growth history:', error);
            setLoading(false);
        }
    };

    return (
        <Modal show={show} onHide={() => setShow(false)} size='xs'>
            <Modal.Header >
                <Modal.Title>Update Growth History</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Form onSubmit={handleSubmitUpdateGrowth}>
                        <Form.Group controlId="formLength">
                            <Form.Label>Length (cm)</Form.Label>
                            <Form.Control
                                name='length'
                                value={record ? record.length : ''}
                                type="number"
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight (g)</Form.Label>
                            <Form.Control
                                name='weight'
                                value={record.weight || ''}
                                type="number"
                                onChange={handleChange} />
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                            {loading ? <Spinner animation="border" size='sm' /> : 'Save'}
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default UpdateGrowthHistory;