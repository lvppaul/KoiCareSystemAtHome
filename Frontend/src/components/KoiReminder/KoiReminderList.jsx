import { useState, useEffect, useContext, useMemo } from 'react'
import { Accordion } from 'react-bootstrap'
import KoiNameFromId from './KoiNameFromId'
import DeleteKoiRemind from './DeleteKoiRemind'
import { getKoiRemindByUserId } from '../../Config/KoiRemind'
import { useAuth } from '../../pages/Login/AuthProvider'
import { ToastContext } from '../../App'

const KoiReminderList = () => {
    const [koiReminders, setKoiReminders] = useState([]);
    const {setToastMessage} = useContext(ToastContext);
    const userId = useAuth().user.userId;
    const [error, setError] = useState(null);

    const formatDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const fetchKoiReminders = async () => {
        try {
            const checkKoiReminds = await getKoiRemindByUserId(userId);
            setKoiReminders(checkKoiReminds);
        } catch (error) {
            setError(error);
            console.error('Error fetching koi reminders:', error);
        }  
    };

    useEffect(() => {
        fetchKoiReminders();
    }, [userId]);

    const handleDeleteKoiRemind = (remindId) => {
        const updateRemindList = koiReminders.filter(remind => remind.remindId !== remindId);
        setKoiReminders(updateRemindList);
      }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{
            maxWidth: '900px',
            margin: '2rem auto',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
            className="container mt-4">
            <h2 style={{
                padding: '1rem 2rem',
                marginBottom: '2rem',
                color: '#2c3e50',
                fontSize: '2.5rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%)',
                borderRadius: '10px',
                textAlign: 'center',
            }} className="mb-4">Koi Reminders</h2>
            <Accordion style={{ padding: '0 1rem' }} defaultActiveKey="0">
                {koiReminders.map((koiRemind, index) => (
                    <Accordion.Item style={{
                        marginBottom: '1rem',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }} key={koiRemind.remindId} eventKey={index.toString()}>
                        <Accordion.Header style={{
                            backgroundColor: '#f8f9fa',
                            padding: '1rem 1.5rem',
                            fontSize: '1.2rem',
                            color: '#34495e',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}>
                            <KoiNameFromId koiId={koiRemind.koiId} /> - {formatDate(koiRemind.dateRemind)}
                        </Accordion.Header>
                        <Accordion.Body style={{
                            padding: '1.5rem',
                            backgroundColor: '#ffffff'
                        }}>
                            <div className="p-3">
                                <p style={{
                                    fontSize: '20px',
                                    lineHeight: '1.6',
                                    color: '#2c3e50',
                                    marginBottom: '1.5rem',
                                    padding: '1rem',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '8px',
                                }}>
                                    {koiRemind.remindDescription}
                                </p>
                                <DeleteKoiRemind
                                    remindId={koiRemind.remindId}
                                    updateKoiRemind={handleDeleteKoiRemind}
                                />
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    )
}

export default KoiReminderList