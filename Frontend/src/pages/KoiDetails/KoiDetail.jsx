import { Container, Row, Col, Card } from 'react-bootstrap';
import UpdateKoiDetail from '../../components/UpdateKoiDetail/UpdateKoiDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKoiById } from '../../Config/KoiApi';
import { Spinner } from 'react-bootstrap';
import GrowHistory from '../../components/GrowthHistory/GrowHistory';
import KoiGrowthChart from '../../components/GrowthChart/KoiGrowth';
import { useAuth } from '../Login/AuthProvider';

const KoiDetail = () => {
  const {koiId} = useParams()
  const [koidetail, setKoiDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModalUpdateKoi, setShowModalUpdateKoi] = useState(false);
  const [showGrowHistory, setShowGrowHistory] = useState(false);
  const [showGrowthChart, setShowGrowthChart] = useState(false);
  const userId = useAuth().user.userId;

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


  
  return (
    <Container style={{ maxWidth: '1536px', marginTop:'100px', marginBottom:'100px'}}>
      <h1 >Koi Details</h1>
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
          <h1 style={{fontWeight:'bold'}}>Growth history</h1>
          <GrowHistory
            show={showGrowHistory}
            setShow={setShowGrowHistory}
            koiData={koidetail}/>

          <h1>Growth chart</h1>
          <KoiGrowthChart
          userId={userId} />

          {/* Remarks */}
          <h4 style={{paddingTop:'50px', }}>Remarks</h4>
          {/* <p style={{fontSize:'30px'}}>
            <strong>{koi.remarks.date}</strong>
            <br />
            Length: {koi.remarks.length} (last measure)
            <br />
            Weight: {koi.remarks.weight}
          </p> */}
        </Col>
      </Row>
    </Container>
  );
};

export default KoiDetail;
