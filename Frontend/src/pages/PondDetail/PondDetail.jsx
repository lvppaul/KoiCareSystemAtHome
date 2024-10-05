import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Card, Pagination } from 'react-bootstrap';
import { MdDelete, MdAdd } from "react-icons/md";
import './PondDetail.css';
import { useState } from 'react';
import AddNewFish from '../../components/AddNewFish';
//   const { pondId } = useParams();

// Use pondId to fetch or display pond details
const PondDetail = () => {
  const koiList = [
    { name: 'Wagon', age: '2 months', variety: 'Kohaku', length: '42 cm' },
    { name: 'Wagon', age: '2 years', variety: 'Goshiki', length: '40 cm' },
    { name: 'Chagoi', age: '2 years', variety: 'Kohaku', length: '40 cm' },
    { name: 'Wagon', age: '1 year', variety: 'Chagoi', length: '39 cm' },
    { name: 'Asagi', age: '20 years', variety: 'Kohaku', length: '42 cm' },
    { name: 'Showa', age: '2 years', variety: 'Goshiki', length: '40 cm' }
  ];
  const [showModalAddFish, setShowModalAddFish] = useState(false);

  return (
    <Container className='pond-detail-container' style={{ marginTop: '100px', marginBottom: '100px' }}>
      <Row style={{ justifyContent: 'flex-end' }}>
        <h1>Pond Name</h1>
        <Button style={{ width: '180px', height: '70px', fontWeight: 'bold', fontSize: '18px', borderRadius: '15px', backgroundColor: '#FF8433' }}>
          <MdDelete size={25} />
          Delete Pond
        </Button>
      </Row>
      <Row>
        <Col md={6}>
          <div>
            <Card.Img className='flex-start'
              src="https://upload.wikimedia.org/wikipedia/commons/1/10/Ojiya_Nishikigoi_no_Sato_ac_%283%29.jpg"
              style={{ width: '650px', height: '700px' }}
            />
          </div>
        </Col>
        <Col md={6} style={{ fontSize: '36px', fontWeight: 'bold' }}>
          <h1>Pond Details</h1>
          <ul className='pond-detail'>
            <li>Pond: Garden pond</li>
            <li>Number of fish: 8-15</li>
            <li>Volume: 3000 gal</li>
            <li>Depth: 1.4-1.5m</li>
            <li>pH: 7-7.5 (range: 4-9)</li>
            <li>Temperature: 20-27°C</li>
            <li>Minimum O2 content: 2.5mg/l</li>
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