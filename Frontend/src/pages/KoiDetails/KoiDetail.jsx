import { Container, Row, Col, Card } from 'react-bootstrap';
import UpdateKoiDetail from '../../components/UpdateKoiDetail/UpdateKoiDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKoiById } from '../../Config/KoiApi';
import { Spinner } from 'react-bootstrap';

const KoiDetail = () => {
  const {koiId} = useParams()
  const [koidetail, setKoiDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModalUpdateKoi, setShowModalUpdateKoi] = useState(false);

  const fetchKoiDetail = async (koiId) => {
    setLoading(true);
    try {
      const data = await getKoiById(koiId);
      console.log('koi detail', data);
      setKoiDetail(data);
    } catch (error) {
      console.error('Error fetching koi detail:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKoiDetail(koiId);
  },[koiId])

  if (loading || !koidetail) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  //adding mockup 
  const koi = {
    name: 'Mock Koi',
    pond: 'Mock Pond',
    age: 2,
    length: '30 cm',
    weight: '1.5 kg',
    thumbnail: 'https://via.placeholder.com/650x1000',
    growthHistory: {
      date: '2023-01-01',
      lastLength: '28 cm',
      lastWeight: '1.4 kg',
    },
    remarks: {
      date: '2023-02-01',
      length: '30 cm',
      weight: '1.5 kg',
    },
  };

  
  return (
    <Container style={{ maxWidth: '1536px', marginTop:'100px', marginBottom:'100px'}}>
      <h1 style={{paddingBottom:'100px'}}>Koi Details</h1>
      <Row style={{justifyContent: 'flex-end'}}>
        <UpdateKoiDetail
        show={showModalUpdateKoi}
        setShow={setShowModalUpdateKoi}
        koidetail={koidetail}
        setKoiDetail={setKoiDetail}
        />
      </Row>
      <Row>
        {/* Koi Image */}
        <Col md={6} mb={6}>
            <img
              src={koidetail.thumbnail}
              style={{ objectFit:'fill',width: '650px', height: '1000px' }}
            />
        </Col>

        {/* Koi Details */}
        <Col md={6} mb={6}>
          <ul style={{ paddingLeft:'50px', fontSize:'30px', paddingBottom: '50px' }}>
            <li>
              <strong>Name:</strong> {koidetail.name}
            </li>
            <li>
              <strong>Age:</strong> {koidetail.age}
            </li>
            <li>
              <strong>Sex:</strong> {koidetail.sex}
            </li>
            <li>
              <strong>Length:</strong> {koidetail.length}
            </li>
            <li>
              <strong>Weight:</strong> {koidetail.weight}
            </li>
            <li>
              <strong>Color:</strong> {koidetail.color}
            </li>
            <li>
              <strong>Variety:</strong> {koidetail.variety}
            </li>
            <li>
              <strong>Physique:</strong> {koidetail.physique}
            </li>
            <li>
              <strong>Origin:</strong> {koidetail.origin}
            </li>
            <li>
              <strong>Note:</strong> {koidetail.note}
            </li>
            <li>
              <strong>Status:</strong> {koidetail.status ? <>Active</> : <>Inactive</>}
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
