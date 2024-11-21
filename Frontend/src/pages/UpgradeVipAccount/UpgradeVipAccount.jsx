import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import backgroundImage from '../../assets/images/updateaccountbackground.png'
import { getVipPackages ,getVipPackagesById } from '../../Config/VipPackageApi';
import RadioButtonChecked from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import vnpay from '../../assets/images/vnpay.png';
import { useAuth } from '../../pages/Login/AuthProvider';
import { orderVipPackage } from '../../Config/VipPackageApi';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import OrderVip from '../Order/OrderVip';

const UpgradeVipAccount = () => {
  const [showModalConfirmOrder, setShowModalConfirmOrder] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [selectPackage, setSelectPackage] = useState({});
  const [vipPackages, setVipPackages] = useState([]);
  const userId = useAuth().user.userId;
  const navigate = useNavigate();

  const handleSelect = async (id) => {
    const response = await getVipPackagesById(id)
    console.log('response select',response);
    setSelectPackage(response);
  };

  const fetchVipPackages = async () => {
    try {
      const response = await getVipPackages();
      setVipPackages(response);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    fetchVipPackages();
  }, []);

  const handlePurchase = async () => {
  
  }

  return (
    <div style={{
      background: `url(${backgroundImage}) repeat center center`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
      margin: 0
    }}>
      <Button
        variant="light"
        className="position-absolute"
        style={{
          backgroundColor: '#E47E39',
          top: '10px',
          left: '0px',
          zIndex: 1050,
          fontSize: '20px',
          fontWeight: 'bold',
          width: '200px',
          height: '50px',
          borderTopRightRadius: '25px',
          borderBottomRightRadius: '25px',
          border: 'none'
        }}
        onClick={() => navigate('/')}
      >
        <BiArrowBack size={30} className="me-2" />
        Back to home
      </Button>
    <Container
      className="vip-purchase-page"
      style={{ display:'flex', flexDirection:'column',
        minWidth: '80vw', minHeight: '80vh',
        height: '100%', width: '100%', opacity: 0.9,
        padding: '20px', background: '#201023',
        borderRadius: '10px' }}
    >
      <h1 className="text-center" style={{color:'white', fontWeight:'bold', fontSize:'72px'}}>VIP Membership</h1>
      <Row className="mt-4" style={{ flex: 1 }} >
        {vipPackages.map((vipPackage) => (
          <Col key={vipPackage.vipId} md={4} style={{ display: 'flex', flexDirection: 'column' }}>
            <Card
              className={`membership-card ${vipPackage.vipId === selectPackage.vipId ? 'selected' : ''}`}
              onClick={() => handleSelect(vipPackage.vipId)}
              style={{
                backgroundSize: 'cover', borderRadius: '20px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}
              >
              <Card.Body className="text-center" 
              style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center',}}>
                <Card.Title>{vipPackage.name}</Card.Title>
                <h2>{vipPackage.options} month</h2>
                <h1>{formatPrice(vipPackage.price)}</h1>
                <p>{vipPackage.description}</p>
                {vipPackage.vipId === selectPackage.vipId ? 
                <RadioButtonChecked style={{ color: 'green', fontSize: 25 }} /> :
                <RadioButtonUnchecked style={{ color: 'red', fontSize: 25 }} />}
              </Card.Body>
            </Card> 
          </Col>
        ))}
      </Row>

      <Row className="mt-4" style={{ flex: 1 }}>
        <Col md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            borderRadius: '20px'}}>
          <div style={{display:'flex', flexDirection:'column', alignItems: 'center', backgroundColor:'#fff', justifyContent:'space-evenly', padding:'20px',
            width:'100%', height:'100%', borderRadius:'20px' ,maxWidth:'100vw', maxHeight:'100vh'}}>
          <h1 style={{fontWeight:'bold'}}>Payment Method</h1>
          <img src={vnpay} alt='vnpay' style={{maxHeight:'100vh', maxWidth:'100vw'}}/>
          </div>
        </Col >
        {selectPackage && (
          <Col  md={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center',
            backgroundColor:'#fff', borderRadius: '20px', alignItems: 'center'}}>
            <h2 style={{fontWeight:'bold'}}>Selected Package Details</h2>
            <p>Name: {selectPackage.name}</p>
            <p>Price: {formatPrice(selectPackage.price)}</p>
            <p>Duration: {selectPackage.options} months</p>
            <Button onClick={() => setShowModalConfirmOrder(true)}
            style={{background: 'rgba(0, 0, 0, 1)', backgroundColor:'#FF4900', opacity: 1, 
            width:'300px', height:'75px', maxWidth:'300px', 
            borderRadius:'20px', fontSize:'25px', fontWeight:'bold'}}>Purchase</Button>
          </Col>
      )}
      {selectPackage && (
      <OrderVip
        show={showModalConfirmOrder}
        setShow={() => setShowModalConfirmOrder(false)}
        data={selectPackage}
      />
      )}
        </Row>
    </Container>
    </div>
  );
};

export default UpgradeVipAccount;
