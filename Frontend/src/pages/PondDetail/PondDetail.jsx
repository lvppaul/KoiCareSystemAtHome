import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Pagination } from 'react-bootstrap';
import { MdDelete, MdAdd } from "react-icons/md";
import './PondDetail.css';
import { useEffect, useState } from 'react';
import AddNewFish from '../../components/AddNewFish/AddNewFish';
import { storage } from '../../Config/firebase';
import {ref, deleteObject} from 'firebase/storage'
import { getPondsById } from '../../Config/PondApi';
import { Spinner } from 'react-bootstrap';
//   const { pondId } = useParams();

// Use pondId to fetch or display pond details
const PondDetail = () => {
  const image = "https://firebasestorage.googleapis.com/v0/b/koi-care-system-at-home-32e49.appspot.com/o/pond%2FpondThumbnails%2FScreenshot%202024-09-13%20210015.png?alt=media&token=631a1c70-5f2b-44d3-8c94-de2c901c5ff4";
  const koiList = [
    { name: 'Wagon', age: '2 months', variety: 'Kohaku', length: '42 cm' },
    { name: 'Wagon', age: '2 years', variety: 'Goshiki', length: '40 cm' },
    { name: 'Chagoi', age: '2 years', variety: 'Kohaku', length: '40 cm' },
    { name: 'Wagon', age: '1 year', variety: 'Chagoi', length: '39 cm' },
    { name: 'Asagi', age: '20 years', variety: 'Kohaku', length: '42 cm' },
    { name: 'Showa', age: '2 years', variety: 'Goshiki', length: '40 cm' }
  ];
  const [showModalAddFish, setShowModalAddFish] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const handleDeleteImage = () => {
    const imageUrl =  image;// Replace with the actual image URL

    const imageRef = ref(storage, imageUrl);

    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  }

  const [pond, setPond] = useState(null);
  const { pondId } = useParams();

  //handle fetch data koi pond by pondId
  useEffect(() => {
    const fetchPondDetails = async () => {
      try {
        const data = await getPondsById(pondId);
        console.log('Fetched koi pond:', data);
        setPond(data);
      } catch (error) {
        console.error('Error fetching koi pond:', error);
      } finally {
        setLoading(false);
      }
    };
    if (pondId) {
      fetchPondDetails();
    }
  }, [pondId]);
  if (loading){
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!pond) {
    return <h1>Pond not found</h1>;
  }

  return (
    <Container className='pond-detail-container' style={{ marginTop: '100px', marginBottom: '100px' }}>
      <Row style={{ justifyContent: 'flex-end' }}>
        <h1 style={{fontWeight:'bolder'}}>{pond.name}</h1>
        <Button onClick={handleDeleteImage} style={{ width: '180px', height: '70px', fontWeight: 'bold', fontSize: '18px', borderRadius: '15px', backgroundColor: '#FF8433' }}>
          <MdDelete size={25} />
          Delete Pond
        </Button>
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
          {koiList.map((koi, index) => (
            <Col md={6} key={index} className="mb-4">
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