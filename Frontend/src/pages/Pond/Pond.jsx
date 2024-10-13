import AddNewPond from '../../components/AddNewPond/AddNewPond'
import './Pond.css'
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPonds, getPondByUserId } from '../../Config/PondApi';
import { Link } from 'react-router-dom';

const Pond = () => {
    const navigate = useNavigate();

    const [ponds, setPonds] = useState([]);
    const [pondId, setPondId] = useState('');
    // const {userId} = useParams();
    const userId = 'U002';
    const navigateToPondDetails = (pondId) => {
        navigate("/ponddetail");
    }

    useEffect(() => {
        const featchPondByUserId = async () => {
            try {
                const data = await getPondByUserId(userId);
                if (data) {
                    console.log('Fetched ponds:', data);
                    setPonds(data);
                } else {
                    console.error('API response is not an array:', data);
                }
        } catch (error) {
            console.error('Error fetching ponds:', error);
        }
    }
    featchPondByUserId();
    }, [userId]);

    const [showModalAddPond, setShowModalAddPond] = useState(false);

    return (
        <>
            <div className='pond-list-header'>
                <h1>Pond List</h1>
                <AddNewPond
                    show={showModalAddPond}
                    setShow={setShowModalAddPond} />
                <Container>
                    <Row>
                            <Col>
                                <Link to={`/ponddetail/${ponds.pondId}`}>
                                    <Card md={4} className='pond-card'>
                                        <Card.Body>
                                            <Card.Img variant="header" src="../../assets/images/shop.png" />
                                        </Card.Body>
                                        <Card.Body>
                                            <h5>{ponds.name}</h5>
                                        </Card.Body>
                                    </Card>
                                </Link>      
                            </Col>
                    
                    </Row>
                </Container>
                <Col>
                    <Card md={4} className='pond-card' onClick={() => navigateToPondDetails()}>
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