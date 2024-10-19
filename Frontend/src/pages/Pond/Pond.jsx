import React, { useState, useEffect, useCallback } from 'react';
import { getPondByUserId } from '../../Config/PondApi';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AddNewPond from '../../components/AddNewPond/AddNewPond';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../Login/AuthProvider';
import './Pond.css';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { useNavigate } from 'react-router-dom';
const Pond = () => {
    const [ponds, setPonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModalAddPond, setShowModalAddPond] = useState(false);
    const userId = useAuth().user.userId;
    const notFound = 'others/NotFound.jpg';
    
    const fetchPondByUserId = useCallback(async () => {
        try {
            const data = await getPondByUserId(userId);
            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].thumbnail) {
                        const storageRef = ref(storage, data[i].thumbnail);
                        try {
                            data[i].thumbnail = await getDownloadURL(storageRef);
                        } catch (error) {
                            console.error(`Error fetching thumbnail for pond ${data[i].pondId}:`, error);
                            const notFoundStorageRef = ref(storage, notFound);
                            data[i].thumbnail = await getDownloadURL(notFoundStorageRef);
                        }
                    } else {
                        const notFoundStorageRef = ref(storage, notFound);
                        data[i].thumbnail = await getDownloadURL(notFoundStorageRef);
                    }
                }
                setPonds(data);
            } else {
                console.log('Fetched ponds is not array:');
            }
        } catch (error) {
            console.error('Error fetching ponds:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);
    
    useEffect(() => {
        fetchPondByUserId();
    }, [fetchPondByUserId]);
    
    const handlePondAdded = async (newPond) => {
        try {
            if (newPond.thumbnail) {
                const storageRef = ref(storage, newPond.thumbnail);
                try {
                    newPond.thumbnail = await getDownloadURL(storageRef);
                } catch (error) {
                    const notFoundStorageRef = ref(storage, notFound);
                    newPond.thumbnail = await getDownloadURL(notFoundStorageRef);
                }
            } else {
                const notFoundStorageRef = ref(storage, notFound);
                newPond.thumbnail = await getDownloadURL(notFoundStorageRef);
            }
            setPonds((prevPonds) => [...prevPonds, newPond]);
            fetchPondByUserId();
            setShowModalAddPond(false); // Close the modal after adding the pond
        } catch (error) {
            console.error('Error fetching thumbnail for new pond:', error);
        }
    };
    
    
    
    return (
        <>
            <div className='pond-list-header'>
                <h1>Pond List</h1>
                <AddNewPond
                    show={showModalAddPond}
                    setShow={setShowModalAddPond}
                    onPondAdded={handlePondAdded}
                    />
                <Container>
                    <Row style={{ justifyContent: 'space-between' }}>
                        {loading ? <Spinner animation="border" /> : ponds.map((pond) => (
                            pond && pond.pondId ? (
                                <Col key={pond.pondId}>
                                    <Card md={4} className='pond-card'>
                                        <Link to={`/ponddetail/${pond.pondId}`} style={{ textDecoration: 'none' }}>
                                            <Card.Body>
                                                <Card.Img variant="header" src={pond.thumbnail} />
                                            </Card.Body>
                                            <Card.Body style={{ textAlign: 'center' }}>
                                                <h5 style={{ color: 'black' }}>{pond.name}</h5>
                                            </Card.Body>
                                        </Link>
                                    </Card>
                                </Col>
                            ) : null
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};


export default Pond;