import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './PondDetail.css';
import { useEffect, useState } from 'react';
import AddNewFish from '../../components/AddNewFish/AddNewFish';
import { getPondsById } from '../../Config/PondApi';
import { Spinner } from 'react-bootstrap';
import UpdatePondDetail from '../../components/UpdatePondDetail/UpdatePondDetail';
import DeletePond from '../../components/DeletePond/DeletePond';
import { getKoiInPond } from '../../Config/PondApi';
import DeleteKoi from '../../components/DeleteKoi/DeleteKoi';

// Use pondId to fetch or display pond details
const PondDetail = () => {
  const [pond, setPond] = useState(null);
  const { pondId } = useParams();
  const [loading, setLoading] = useState(true); // Loading state
  const [koiList, setKoiList] = useState([]);
  const [showModalAddPond, setShowModalAddPond] = useState(false);
  const [showModalAddFish, setShowModalAddFish] = useState(false);
  const [loadingKoi, setLoadingKoi] = useState(true);

  //handle fetch data koi pond by pondId
  const fetchPond = (pondId) => {
    getPondsById(pondId)
      .then(data => {
        setPond(data);  
        setLoading(false);
      })
      .catch (error => {
        console.error('Error fetching koi pond:', error);
        setLoading(false);        
      });
  };

  const fetchKoiInPond = (pondId) => {
    getKoiInPond(pondId)
      .then(data => {
        setKoiList(data);
        if(data.length > 0) setLoadingKoi(false);
      }
      )
      .catch (error => {
        console.error('Error fetching koi in pond:', error);
        setLoadingKoi(false);
      });
  };

  useEffect(() => {
      fetchPond(pondId);
      fetchKoiInPond(pondId);
    }, [pondId]);
    
  if (loading || !pond) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  const handleOnFishAdded = (newKoi) => {
    setKoiList([...koiList, newKoi]);
    fetchKoiInPond(pondId);
  }

  const handleOnFishDeleted = (koiId) => {
    const updatedKoiList = koiList.filter(koi => koi.koiId !== koiId);
    setKoiList(updatedKoiList);
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
        pondData={pond}
        koiInPond={koiList}/>
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
          </ul>
        </Col>
      </Row>
      <hr style={{ width: '50%', borderTop: '5px solid #000', margin: '100px auto' }} />
      <Row>
        <h1>Koi list in the pond</h1>
        <AddNewFish
          show={showModalAddFish}
          setShow={setShowModalAddFish} 
          onKoiAdded={handleOnFishAdded}/>
        <Row>
          {loadingKoi ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h3>No Koi in this pond </h3>
        <Spinner size='50' variant="primary" />
            </div>
          ) : null}
          {koiList.map((koi) => ( koi && koi.koiId ? (
            <Col md={6}  className="mb-4" key={koi.koiId}>
              <Card 
              style={{  backgroundColor: '#E2C3C3', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 1, 1)', width: '90%', height: '225px'}}
              >
                 <Link to={`/koidetail/${koi.koiId}`} style={{ textDecoration: 'none', color: 'black'}}>
                <div style={{ display: 'flex', alignItems: 'center'}}>
                  <Card.Img
                    src={koi.thumbnail}
                    style={{ width:'223px', height:'223px', borderRadius: '15px 0 0 15px', objectFit: 'cover', marginBottom:'15px' }}
                    />
                  <Card.Body style={{ marginLeft:'10px' }}>
                    <Card.Title style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{`Name: ${koi.name}`}</Card.Title>
                    <p style={{ fontSize: '18px'}}>
                      <strong>Age:</strong> {koi.age} <br/>
                      <strong>Variety:</strong> {koi.variety}<br/>
                      <strong>Length:</strong> {koi.length}<br/>
                      <strong>Weight:</strong> {koi.weight}<br/>
                    </p>                     
                  </Card.Body>
                </div>
                </Link>
                <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <DeleteKoi
                    koiData={koi}
                    handleKoiDelete={handleOnFishDeleted}/> 
                </div>
              </Card>
              
            </Col>
          ) : null
          ))}
        </Row>
      </Row>
    </Container>
  );
};

export default PondDetail;