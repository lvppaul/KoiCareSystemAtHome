import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPondByUserId } from '../../Config/PondApi';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AddNewPond from '../../components/AddNewPond/AddNewPond';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../Login/AuthProvider';
import './Pond.css';

const Pond = () => {
    const navigate = useNavigate();
    const [showModalAddPond, setShowModalAddPond] = useState(false);
    const [ponds, setPonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useAuth().user.userId;

    useEffect(() => {
        const fetchPondByUserId = async () => {
            try {
                const data = await getPondByUserId(userId);
                if (Array.isArray(data)) {
                    console.log('Fetched ponds:', data);
                    setPonds(data);
                } else {
                    console.error('API response is not an array:', data);
                }
            } catch (error) {
                console.error('Error fetching ponds:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPondByUserId();
    }, [userId]);

    const handlePondAdded = (newPond) => {
        setPonds((prevPonds) => Array.isArray(prevPonds) ? [...prevPonds, newPond] : [newPond]);
    };

    const getImageUrl = (imagePath) => {
        return imagePath; // Assuming imagePath is already a full URL from Firebase
    };

    return (
        <>
            <div className='pond-list-header'>
                <h1>Pond List</h1>
                <AddNewPond
                    show={showModalAddPond}
                    setShow={setShowModalAddPond} 
                    onPondAdded={handlePondAdded}/>
                <Container>
                    <Row style={{justifyContent: 'space-between'}}>
                        {loading ? <Spinner animation="border" /> : ponds.map((pond) => (
                            pond && pond.pondId ? (
                                <Col key={pond.pondId}>
                                    <Card md={4} className='pond-card'>
                                        <Link to={`/ponddetail/${pond.pondId}`} style={{textDecoration: 'none'}}>
                                            <Card.Body>
                                                <Card.Img variant="header" src={getImageUrl(pond.thumbnailUrl)} />
                                            </Card.Body>
                                            <Card.Body style={{textAlign: 'center'}}>
                                                <h5 style={{color:'black'}}>{pond.name}</h5>
                                            </Card.Body>
                                        </Link>      
                                    </Card>
                                </Col>
                            ) : null
                        ))}
                    </Row>
                </Container>
                <Col>
                    <Card md={4} className='pond-card'>
                        <Card.Body>
                            <Card.Img variant="header" src="../../assets/images/shop.png" />
                        </Card.Body>
                        <Card.Body>
                            <h5>sample</h5>
                        </Card.Body>
                    </Card>
                </Col>
            </div>
        </>
    );
};

export default Pond;