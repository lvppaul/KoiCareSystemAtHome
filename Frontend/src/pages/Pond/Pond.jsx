import AddNewPond from '../../components/AddNewPond/AddNewPond'
import './Pond.css'
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPondByUserId } from '../../Config/PondApi';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth } from '../Login/AuthProvider';
const Pond = () => {
    const [showModalAddPond, setShowModalAddPond] = useState(false);

    const [ponds, setPonds] = useState([]);
    const user = useAuth();
    const userId = user.user.userId;
    const [loading, setLoading] = useState(true);
 

    useEffect(() => {
        const featchPondByUserId = async () => {
            try {
                const data = await getPondByUserId(userId);
                if (data) {
                    setPonds(data);
                    setLoading(false);
                } else {
                    console.error('API response is not an array:', data);
                }
        } catch (error) {
            console.error('Error fetching ponds:', error);
        }
    }
    featchPondByUserId();
    }, [userId]);
    
    

    return (
        <>
            <div className='pond-list-header'>
                <h1>Pond List</h1>
                <AddNewPond
                    show={showModalAddPond}
                    setShow={setShowModalAddPond} />
                <Container>
                        
                    <Row>
                    {loading? <Spinner/> : ponds.map((pond) => (
                        <Col>
                            <Card md={4} className='pond-card'>
                                <Link to={`/ponddetail/${pond.pondId}`} style={{textDecoration: 'none'}}>
                                <Card.Body>
                                    <Card.Img variant="header" src={pond.thumbnail} />
                                </Card.Body>
                                <Card.Body style={{textAlign: 'center'}}>
                                    <h5 style={{color:'black'}}>{pond.name}</h5>
                                </Card.Body>
                                </Link>      
                            </Card>
                        </Col>
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
    )
}


export default Pond