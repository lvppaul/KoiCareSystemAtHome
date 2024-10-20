import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Pagination } from 'react-bootstrap';
import { MdDelete, MdAdd } from "react-icons/md";
import './PondDetail.css';
import { useEffect, useState, useCallback } from 'react';
import AddNewFish from '../../components/AddNewFish/AddNewFish';
import { storage } from '../../Config/firebase';
import {ref, getDownloadURL} from 'firebase/storage'
import { getPondsById } from '../../Config/PondApi';
import { Spinner } from 'react-bootstrap';
import UpdatePondDetail from '../../components/UpdatePondDetail/UpdatePondDetail';
import DeletePond from '../../components/DeletePond/DeletePond';
import { getKoiInPond } from '../../Config/PondApi';
// Use pondId to fetch or display pond details
const PondDetail = () => {
  const [pond, setPond] = useState(null);
  const { pondId } = useParams();
  const [loading, setLoading] = useState(true); // Loading state
  const [koiList, setKoiList] = useState([]);
  const [showModalAddPond, setShowModalAddPond] = useState(false);
  const [showModalAddFish, setShowModalAddFish] = useState(false);
  const notFound = 'others/NotFound.jpg';
  const [loadingKoi, setLoadingKoi] = useState(true);
  //handle fetch data koi pond by pondId
  useEffect(() => {
      getPondsById(pondId)
      .then(data => {
        setPond(data);  
        setLoading(false);
      })
      .catch (error => {
        console.error('Error fetching koi pond:', error);
        setLoading(false);        
      });
      getKoiInPond(pondId)
      .then(data => {
        setKoiList(data);
        if(data.length > 0) setLoadingKoi(false);
      })
      
    }, [pondId]);
    
  if (loading || !pond) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  
  

  return (
    <Container className='pond-detail-container' style={{ marginTop: '100px', marginBottom: '100px' }}>
      <Row style={{ justifyContent: 'flex-end' }}>
        <h1 style={{fontWeight:'bolder'}}>{pond.name}</h1>
        <UpdatePondDetail 
          pond={pond}
          show={showModalAddPond}
          setShow={setShowModalAddPond} 
          setPond={setPond}/>
        <DeletePond 
        pondData={pond}/>
      </Row>
      <Row>
        <Col md={6}>
          <div>
            <Card.Img className='flex-start'
              src= {pond.thumbnail}
              style={{ width: '650px', height: '700px', borderRadius: '50px' }}
            />
          </div>
        </Col>
        <Col md={6} style={{ fontSize: '36px', fontWeight: 'bold' }}>
          <h1 style={{fontWeight: 'bold'}}>Pond Details</h1>
          <ul className='pond-detail'>
            <li><strong>Volume:</strong> {pond.volume} liters</li>
            <li><strong>Depth:</strong> {pond.depth} meters</li>
            <li><strong>Pumping Capacity:</strong> {pond.pumpingCapacity} liters/hour</li>
            <li><strong>Drain:</strong> {pond.drain}</li>
            <li><strong>Skimmer:</strong> {pond.skimmer}</li>
            <li><strong>Note:</strong> {pond.note}</li>
            {/* <li></li> */}
          </ul>
        </Col>
      </Row>
      <hr style={{ width: '50%', borderTop: '5px solid #000', margin: '100px auto' }} />
      <Row>
        <h1>Koi list in the pond</h1>
        <AddNewFish
          show={showModalAddFish}
          setShow={setShowModalAddFish} />
        <Row>
          {loadingKoi ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h3>No Koi in this pond </h3>
        <Spinner size='50' variant="primary" />
      </div>
    ) : null}
          {koiList.map((koi) => (
            <Col md={6}  className="mb-4">
              <Card 
              style={{ backgroundColor: '#E2C3C3', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
              > <span><a href='/koidetail'></a></span>
                 
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Card.Img
                    src="https://upload.wikimedia.org/wikipedia/commons/1/10/Ojiya_Nishikigoi_no_Sato_ac_%283%29.jpg"
                    style={{ width: '40%', height: '100%', borderRadius: '15px 0 0 15px', objectFit: 'cover' }}
                    
                  />
                  <Card.Body style={{ padding: '20px' }}>
                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{`Name: ${koi.name}`}</Card.Title>
                    <Card.Text style={{ fontSize: '1rem' }}>
                      Age: {koi.age} <br />
                      Variety: {koi.variety} <br />
                      Length: {koi.length}
                    </Card.Text>
                  </Card.Body>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Row>
    </Container>
  );
};

export default PondDetail;