import React, { useState, useEffect, useCallback } from 'react';
import { getPondByUserId } from '../../Config/PondApi';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AddNewPond from '../../components/AddNewPond/AddNewPond';
import { Pagination,Card, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from '../Login/AuthProvider';
import './Pond.css';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import DeletePond from '../../components/DeletePond/DeletePond';
import { getKoiInPond } from '../../Config/PondApi';

const Pond = () => {
    const [ponds, setPonds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModalAddPond, setShowModalAddPond] = useState(false);
    const userId = useAuth().user.userId;
    const notFound = 'others/NotFound.jpg';
    
    const fetchPondByUserId = useCallback(async () => {
        console.time('fetchPondByUserId');
        try {
            const data = await getPondByUserId(userId);
            if (Array.isArray(data)) {
                const updatedData = await Promise.all(data.map(async (pond) => {
                    if (pond.thumbnail) {
                        const storageRef = ref(storage, pond.thumbnail);
                        try {
                            pond.thumbnail = await getDownloadURL(storageRef);
                        } catch (error) {
                            console.error(`Error fetching thumbnail for pond ${pond.pondId}:`, error);
                            const notFoundStorageRef = ref(storage, notFound);
                            pond.thumbnail = await getDownloadURL(notFoundStorageRef);
                        }
                    } else {
                        const notFoundStorageRef = ref(storage, notFound);
                        pond.thumbnail = await getDownloadURL(notFoundStorageRef);
                    }
                    const koiInPond = await getKoiInPond(pond.pondId);
                    pond.koiInPond = koiInPond;

                    return pond;
                }));
                setPonds(updatedData);
            } else {
                console.log('Fetched ponds is not array:');
            }
        } catch (error) {
            console.error('Error fetching ponds:', error);
        } finally {
            setLoading(false);
            console.timeEnd('fetchPondByUserId');
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

    const handlePondDeleted = (pondId) => {
        const updatedPonds = ponds.filter(pond => pond.pondId !== pondId);
        setPonds(updatedPonds);
    };
    
    //handle paging
    const [currentPage, setCurrentPage] = useState(1);
    const pondsPerPage = 6;
    const indexOfLastProduct = currentPage * pondsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - pondsPerPage;
    const currentPonds = ponds.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(ponds.length / pondsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
    
    return (
        <>
            <div className='pond-list-header'>
                <h1>Pond List</h1>
            </div>
                
                <Container>
                <Row style={{display:'flex',justifyContent: 'flex-end',marginBottom:'50px'}}>
                <AddNewPond
                    show={showModalAddPond}
                    setShow={setShowModalAddPond}
                    onPondAdded={handlePondAdded}
                    />
                </Row>
                    <Row style={{ justifyContent: 'space-between', paddingBottom:'200px' }}>
                        {loading ? <Spinner animation="border" /> : currentPonds.map((pond) => (
                            pond && pond.pondId ? (
                                <Col key={pond.pondId} xs={12} sm={6} md={4} lg={4} className="d-flex align-items-stretch">
                                    <Card   className='pond-card w-100'>
                                        <Link to={`/ponddetail/${pond.pondId}`} style={{ textDecoration: 'none' }}>
                                            <Card.Body style={{justifyContent:'flex-start'}} >
                                                <Card.Img  src={pond.thumbnail} style={{display:'flex'}} />
                                            </Card.Body>
                                            <Card.Body style={{ textAlign: 'center' }}>
                                                <h5 style={{ color: 'black' }}>{pond.name}</h5>
                                            </Card.Body>
                                        </Link>
                                        <Card.Footer style={{marginBottom:'70px'}}>
                                        <DeletePond 
                                        pondData={pond} 
                                        koiInPond={pond.koiInPond}
                                        onPondDelete={handlePondDeleted} />
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ) : null
                        ))}
                        </Row>
                    <Row>
            <Col className="d-flex justify-content-center">
              <Pagination>
                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                {[...Array(totalPages).keys()].map(number => (
                  <Pagination.Item
                    key={number + 1}
                    active={number + 1 === currentPage}
                    onClick={() => setCurrentPage(number + 1)}
                  >
                    {number + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={handleNextPage} disabled={currentPage === totalPages} />
              </Pagination>
            </Col>
          </Row>
                </Container>
        </>
    );
};


export default Pond;