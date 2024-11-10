import { Container, Row, Col, Button, Accordion, Table } from 'react-bootstrap';
import UpdateKoiDetail from '../../components/UpdateKoiDetail/UpdateKoiDetail';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getKoiById } from '../../Config/KoiApi';
import { Spinner } from 'react-bootstrap';
import GrowHistory from '../../components/GrowthHistory/GrowHistory';
import KoiGrowthChart from '../../components/GrowthChart/KoiGrowth';
import { useAuth } from '../Login/AuthProvider';
import { BiBell, BiInfoCircle } from 'react-icons/bi';
import CreateNewReminded from '../../components/KoiReminder/CreateNewReminded';
import KoiNameFromId from '../../components/KoiReminder/KoiNameFromId';
import DeleteKoiRemind from '../../components/KoiReminder/DeleteKoiRemind';
import { Pagination } from 'react-bootstrap';
import UpdateKoiReminder from '../../components/KoiReminder/UpdateKoiReminder';



const KoiDetail = () => {
  const {koiId} = useParams()
  const [koidetail, setKoiDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModalUpdateKoi, setShowModalUpdateKoi] = useState(false);
  const [showGrowHistory, setShowGrowHistory] = useState(false);
  const [showRemind, setShowRemind] = useState(false);
  const [showModalAddRemind, setShowModalAddRemind] = useState(false);
  const [showModalUpdateRemind, setShowModalUpdateRemind] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);
  const userId = useAuth().user.userId;
  const [remindList, setRemindList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  const fetchKoiDetail = async (koiId) => {
    setLoading(true);
    try {
      const data = await getKoiById(koiId);
      console.log('koi detail', data);
      setKoiDetail(data);
      const sortedReminds = data.reminds.sort((a, b) => new Date(b.dateRemind) - new Date(a.dateRemind));
      setRemindList(sortedReminds);
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
  
  const handleDeleteKoiRemind = (remindId) => {
    const updateRemindList = currentRemind.filter(remind => remind.remindId !== remindId);
    setRemindList(updateRemindList);
  }

  const handleUpdateKoiRemind = (remind) => {
    setCurrentReminder(remind);
    setShowModalUpdateRemind(true);
  };


  const formatDate = (date) => {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
  }

    const remindPerPage = 3;
    const indexOfLastRemind = currentPage * remindPerPage;
    const indexOfFirstRemind = indexOfLastRemind - remindPerPage;
    const currentRemind = remindList.slice(indexOfFirstRemind, indexOfLastRemind);

    const totalPages = Math.ceil(remindList.length / remindPerPage);

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
    <Container style={{ maxWidth: '1536px', marginTop:'100px', marginBottom:'100px'}}>
      <h1 style={{fontWeight:'bold'}}>Koi Details</h1>
      <Row style={{display:'flex', justifyContent: 'flex-end', flexDirection:'row'}}>
        {user.role === 'vip'?
        <Button
        onClick={() => {
          setShowModalAddRemind(true);
          console.log('koiId:', koiId);}}
        style={{
          width: "180px",
          height: "70px",
          fontWeight: "bold",
          fontSize: "18px",
          borderRadius: "15px",
          backgroundColor: "#FF8433",
          transition: "background-color 0.3s ease",
          marginInlineEnd: "10px",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#FF6204")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#FF8433")}>
          <BiBell size={30}/> New Remind
        </Button>
        : null}

        <UpdateKoiDetail
        show={showModalUpdateKoi}
        setShow={setShowModalUpdateKoi}
        koidetail={koidetail}
        setKoiDetail={setKoiDetail}
        />
      </Row>
      {/* modal create new remind */}
        <CreateNewReminded
          show={showModalAddRemind}
          setShow={setShowModalAddRemind}
          koiId={koidetail?.koiId}
          updateKoiReminder={fetchKoiDetail}
        />

        {currentReminder && (
        <UpdateKoiReminder
          show={showModalUpdateRemind}
          setShow={setShowModalUpdateRemind}
          reminder={currentReminder}
          updateKoiReminder={fetchKoiDetail}
        />
      )}

      <Row>
        {/* Koi Image */}
        <Col xs={12} md={6} mb={12} lg={6} xl={6}>
          <Row>
            <img
              src={koidetail.thumbnail}
              alt={koidetail.thumbnail}
              style={{ objectFit:'fill',width: '650px', height: '1000px', maxHeight:'1000px', maxWidth:'650px', 
              minHeight:'200px', minWidth:'250'}}
              />
          </Row>
          {/* Koi Reminders */}
          {user.role === 'vip' ? (
          <Row>
            {koidetail.reminds.length > 0 ? (
            <>
              <div style={{
            maxWidth: '900px',
            margin: '2rem auto',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
            className="container mt-4">
            <h2 style={{
                padding: '1rem 2rem',
                marginBottom: '2rem',
                color: '#2c3e50',
                fontSize: '2.5rem',
                fontWeight: '600',
                background: 'linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%)',
                borderRadius: '10px',
                textAlign: 'center',
            }} className="mb-4">Koi Reminders</h2>
            <Accordion style={{ padding: '0 1rem' }} defaultActiveKey="0">
                {currentRemind.map((koiRemind, index) => (
                    <Accordion.Item style={{
                        marginBottom: '1rem',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }} key={koiRemind.remindId} eventKey={index.toString()}>
                        <Accordion.Header style={{
                            backgroundColor: '#f8f9fa',
                            padding: '1rem 1.5rem',
                            fontSize: '1.2rem',
                            color: '#34495e',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                        }}>
                            <KoiNameFromId koiId={koiRemind.koiId} /> - {formatDate(koiRemind.dateRemind)}
                        </Accordion.Header>
                        <Accordion.Body style={{
                            padding: '1.5rem',
                            backgroundColor: '#ffffff'
                        }}>
                            <div className="p-3">
                                <p style={{
                                    fontSize: '20px',
                                    lineHeight: '1.6',
                                    color: '#2c3e50',
                                    marginBottom: '1.5rem',
                                    padding: '1rem',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '8px',
                                }}>
                                    {koiRemind.remindDescription}
                                </p>
                                <div style={{
                                  display: 'flex',
                                  justifyContent: 'flex-end',
                                }}>

                                <Button variant='warning' style={{marginTop: '1rem', marginInlineEnd:'10px'}} onClick={() => handleUpdateKoiRemind(koiRemind)}> 
                                  <BiInfoCircle size={30} />
                                  </Button>
                                <DeleteKoiRemind
                                    remindId={koiRemind.remindId}
                                    updateKoiRemind={handleDeleteKoiRemind}
                                    />
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
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
          </div>
          </> 
          )
          : null}
          </Row>
          ) : null}
        </Col>

        {/* Koi Details */}
        <Col md={6} mb={6}>
        <Table striped hover bordered style={{marginTop:'20px', borderRadius:'15px', border:'1px solid black'}}>
            <tbody>
              <tr>
                <td><strong>Name</strong></td>
                <td>{koidetail.name}</td>
              </tr>
              <tr>
                <td><strong>Age</strong></td>
                <td>{koidetail.age}</td>
              </tr>
              <tr>
                <td><strong>Sex</strong></td>
                <td>{koidetail.sex}</td>
              </tr>
              <tr>
                <td><strong>Length</strong></td>
                <td>{koidetail.length}</td>
              </tr>
              <tr>
                <td><strong>Weight</strong></td>
                <td>{koidetail.weight}</td>
              </tr>
              <tr>
                <td><strong>Color</strong></td>
                <td>{koidetail.color}</td>
              </tr>
              <tr>
                <td><strong>Variety</strong></td>
                <td>{koidetail.variety}</td>
              </tr>
              <tr>
                <td><strong>Physique</strong></td>
                <td>{koidetail.physique}</td>
              </tr>
              <tr>
                <td><strong>Origin</strong></td>
                <td>{koidetail.origin}</td>
              </tr>
              <tr>
                <td><strong>Note</strong></td>
                <td>{koidetail.note}</td>
              </tr>
              <tr>
                <td><strong>Status</strong></td>
                <td>{koidetail.status ? 'Active' : 'InActive'}</td>
              </tr>
            </tbody>
          </Table>
        
          {/* Growth History */}
          <h1 style={{fontWeight:'bold'}}>Growth history</h1>
          <GrowHistory
            show={showGrowHistory}
            setShow={setShowGrowHistory}
            koiData={koidetail}/>

          <h1>Growth chart</h1>
          <KoiGrowthChart
          userId={userId} />

        </Col>
      </Row>
    </Container>
  );
};

export default KoiDetail;
