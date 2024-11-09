import { useState , useEffect } from 'react'
import { useAuth } from '../../pages/Login/AuthProvider'
import { Container,Row,Col, Card, Button } from 'react-bootstrap'
import {Spinner   } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DeleteKoi from '../../components/DeleteKoi/DeleteKoi'
import { getKoiByUserId, getKoiAliveInAllPond, getKoiDeadInAllPond, getKoiMaleInAllPond, getKoiFemaleInAllPond,getKoiWithThumbnail } from '../../Config/KoiApi'
import { set } from 'date-fns'

const KoiList = () => {
  const userId = useAuth().user.userId;
    const [koiList, setKoiList] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showCreateKoiReminder, setShowCreateKoiReminder] = useState(false);

    useEffect(() => {
        const fetchKoiList = async () => {
            setLoading(true);
            try {
                let kois;
                switch (sortCriteria) {
                    case 'male':
                        kois = await getKoiMaleInAllPond(userId);
                        break;
                    case 'female':
                        kois = await getKoiFemaleInAllPond(userId);
                        break;
                    case 'alive':
                        kois = await getKoiAliveInAllPond(userId);
                        break;
                    case 'dead':
                        kois = await getKoiDeadInAllPond(userId);
                        break;
                    default:
                        kois = await getKoiByUserId(userId);
                        break;
                }
                const koiListWithThumbnail = await getKoiWithThumbnail(kois);
                setKoiList(koiListWithThumbnail);
            } catch (error) {
                console.error('Error fetching koi list:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchKoiList();
    }, [sortCriteria, userId]);

    const handleSortChange = (event) => {
        setSortCriteria(event.target.value);
    };

  const handleOnFishDeleted = (koiId) => {
    const updatedKoiList = koiList.filter(koi => koi.koiId !== koiId);
    setKoiList(updatedKoiList);
  }

  return (
    <Container>
      <Row style={{textAlign:'center', paddingTop:'50px', paddingBottom:'50px'}}>
      <h1>All Koi Fish List</h1>
      </Row>
      <Col className="d-flex justify-content-center" style={{display:'flex', alignItems:'flex-end', flexDirection:'column', marginBlockEnd:'30px'}}>
        <Row>
            <Button variant="success" onClick={() => setShowCreateKoiReminder(true)}
                    style={{ width: '180px', height: '70px', 
                        fontWeight: 'bold', fontSize: '16px',
                        marginInlineEnd:'20px', 
                        borderRadius: '15px', backgroundColor: '#FF8433', transition: 'background-color 0.3s ease'}}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#FF6204'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#FF8433'}
              >New Reminder
            </Button>
            
            <select style={{textAlign:'center', fontSize:'20px', fontWeight:'bold' ,width:'100%' , maxWidth:'200px', minWidth:'200px', height:"60px"}} onChange={handleSortChange} value={sortCriteria}>
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
            </select>
        </Row>
      </Col>
      <Row>
          {loading ? (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <h3>No Koi in this pond </h3>
        <Spinner size='50' variant="primary" />
            </div>
          ) : null}
          {koiList.map((koi) => ( koi && koi.koiId ? (
            <Col xs={12} md={6} sm={6} lg={6}   className="mb-4" key={koi.koiId}>
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
    </Container>
  )
}

export default KoiList