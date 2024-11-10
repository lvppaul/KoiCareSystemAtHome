import { useState, useEffect, useContext } from 'react'
import { Accordion, Button, Pagination } from 'react-bootstrap'
import KoiNameFromId from './KoiNameFromId'
import DeleteKoiRemind from './DeleteKoiRemind'
import { getKoiRemindByUserId } from '../../Config/KoiRemind'
import { useAuth } from '../../pages/Login/AuthProvider'
import UpdateKoiReminder from './UpdateKoiReminder'
import { BiInfoCircle } from 'react-icons/bi'

const KoiReminderList = () => {
    const [koiReminders, setKoiReminders] = useState([]);
    const userId = useAuth().user.userId;
    const [error, setError] = useState(null);
    const [showModalUpdateRemind, setShowModalUpdateRemind] = useState(false);
    const [currentReminder, setCurrentReminder] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const formatDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    const fetchKoiReminders = async () => {
        try {
            const checkKoiReminds = await getKoiRemindByUserId(userId);
            const sortedReminds = checkKoiReminds.sort((a, b) => new Date(a.dateRemind) - new Date(b.dateRemind));
            setKoiReminders(sortedReminds);
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

    const handleUpdateKoiRemind = (remind) => {
        setCurrentReminder(remind);
        setShowModalUpdateRemind(true);
    };


    if (error) {
        return <div>Error: {error}</div>;
    }
    const indexOfLastReminder = currentPage * itemsPerPage;
    const indexOfFirstReminder = indexOfLastReminder - itemsPerPage;
    const currentReminders = koiReminders.slice(indexOfFirstReminder, indexOfLastReminder);
    const totalPages = Math.ceil(koiReminders.length / itemsPerPage);

    return (
        <>
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
                <Accordion>
                    {currentReminders.map((koiRemind, index) => (
                        <Accordion.Item key={koiRemind.remindId} eventKey={index.toString()}>
                            <Accordion.Header>
                                <KoiNameFromId koiId={koiRemind.koiId} /> - {formatDate(koiRemind.dateRemind)}
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="p-3">
                                    <p>
                                        {koiRemind.remindDescription}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button style={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            marginTop: '1rem',
                                            marginInlineEnd:'10px',
                                        }} variant="warning" onClick={() => handleUpdateKoiRemind(koiRemind)}>
                                            <BiInfoCircle size={30} /></Button>
                                        <DeleteKoiRemind
                                            remindId={koiRemind.remindId}
                                            updateKoiRemind={handleDeleteKoiRemind}
                                        />
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <Pagination>
                    <Pagination.Prev onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map(number => (
                        <Pagination.Item
                            key={number + 1}
                            active={number + 1 === currentPage}
                            onClick={() => setCurrentPage(number + 1)}
                        >
                            {number + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} />
                </Pagination>
                {currentReminder && (
                    <UpdateKoiReminder
                        show={showModalUpdateRemind}
                        setShow={setShowModalUpdateRemind}
                        reminder={currentReminder}
                        updateKoiReminder={fetchKoiReminders}
                    />
                )}
            </div>
        </>
    );
};


export default KoiReminderList