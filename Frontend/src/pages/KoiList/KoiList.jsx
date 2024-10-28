import { useState ,useCallback, useEffect } from 'react'
import { useAuth } from '../../pages/Login/AuthProvider'
import { Container,Row,Col, Card } from 'react-bootstrap'
import {Spinner   } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DeleteKoi from '../../components/DeleteKoi/DeleteKoi'
import { getKoiByUserId } from '../../Config/KoiApi'

const KoiList = () => {
  const [koiList, setKoiList] = useState([])
  const [loading, setLoading] = useState(false)
  const userId = useAuth().user.userId

  const fetchKoiList = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getKoiByUserId(userId)
      setKoiList(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching koi list:', error)
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    fetchKoiList()
  }, [fetchKoiList])


  const handleOnFishDeleted = (koiId) => {
    const updatedKoiList = koiList.filter(koi => koi.koiId !== koiId);
    setKoiList(updatedKoiList);
  }

  return (
    <Container>
      <Row style={{textAlign:'center', paddingTop:'50px', paddingBottom:'50px'}}>
      <h1>All Koi Fish List</h1>
      </Row>
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