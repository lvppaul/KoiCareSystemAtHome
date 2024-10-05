import { Container, Row, Col, Card } from 'react-bootstrap';

const KoiDetail = () => {
  const koi = {
    name: 'Koikoi',
    pond: 'Pond In front house',
    age: '2 months',
    length: '17 cm',
    weight: '88 g',
    growthHistory: {
      date: '09.09.2024',
      lastLength: '17 cm',
      lastWeight: '88 g',
    },
    remarks: {
      date: '09.09.2024',
      length: '17 cm',
      weight: '88 g',
    },
    imageSrc:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Ojiya_Nishikigoi_no_Sato_ac_%283%29.jpg', // Replace with actual image URL
  };

  return (
    <Container style={{ maxWidth: '1536px', marginTop:'100px', marginBottom:'100px'}}>
      <h1 style={{paddingBottom:'100px'}}>Koi Details</h1>
      <Row>
        {/* Koi Image */}
        <Col md={6}>
            <img
              src={koi.imageSrc}
              style={{ objectFit:'fill',width: '650px', height: '1000px' }}
            />
        </Col>

        {/* Koi Details */}
        <Col md={6} style={{padding: '20px'}}>
          <ul style={{ paddingLeft:'50px', fontSize:'30px', paddingBottom: '50px' }}>
            <li>
              <strong>Name:</strong> {koi.name}
            </li>
            <li>
              <strong>Pond:</strong> {koi.pond}
            </li>
            <li>
              <strong>Age:</strong> {koi.age}
            </li>
            <li>
              <strong>Length:</strong> {koi.length}
            </li>
            <li>
              <strong>Weight:</strong> {koi.weight}
            </li>
          </ul>

          {/* Growth History */}
          <h4>Growth history</h4>
          <Card style={{ padding: '10px', borderRadius: '10px' }}>
            <p>{koi.growthHistory.date}</p>
            <p>
              Length: {koi.growthHistory.lastLength} (last measure)
              <br />
              Weight: {koi.growthHistory.lastWeight}
            </p>
          </Card>

          {/* Remarks */}
          <h4 style={{paddingTop:'50px', }}>Remarks</h4>
          <p style={{fontSize:'30px'}}>
            <strong>{koi.remarks.date}</strong>
            <br />
            Length: {koi.remarks.length} (last measure)
            <br />
            Weight: {koi.remarks.weight}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default KoiDetail;
