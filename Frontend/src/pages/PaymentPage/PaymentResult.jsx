import { useEffect, useState } from 'react';
import { getVNPayResult } from '../../Config/VNPayApi';
import { Container, Spinner, Button } from 'react-bootstrap';
import background from '../../assets/images/updateaccountbackground.png';
import { BiXCircle, BiCheckCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { getOrderById } from '../../Config/OrderApi';
import { upgradeVipAccount } from '../../Config/UserApi';
import { useAuth } from '../Login/AuthProvider';
import { getVipPackageByOrderId } from '../../Config/VipPackageApi';
import { createVipRecord } from '../../Config/VipRecord';
import { refreshToken } from '../../Config/UserApi';

const PaymentResult = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentState, setPaymentState] = useState(false);
  const returnUrl = window.location.href;
  const [isVipUpgrade, setIsVipUpgrade] = useState(false);
  const {logout} = useAuth();
  const [userId, setUserId] = useState('');

  const sendReturnUrl = async () => {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('vnp_OrderInfo');
    if (returnUrl) {
      // setLoading(true);
      // Call the backend API with the returnUrl
      const response = await getVNPayResult(returnUrl);
      if (response) {
        console.log('response:', response);
        if (response.status === 200) {
          setPaymentState(true);
          const orderResponse = await getOrderById(orderId);
          console.log('orderResponse:', orderResponse);
          if (orderResponse.isVipUpgrade) {
            const userId = orderResponse.userId;
            setUserId(userId);
            const vipPackage = await getVipPackageByOrderId(orderId);
            await upgradeVipAccount(userId);
            let vipRecord = {
              userId: userId,
              vipId: vipPackage.vipId,
            };
            await createVipRecord(vipRecord);
            setIsVipUpgrade(true);
          }
        } else {
          setPaymentState(false);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  }; 


  useEffect(() => {
    sendReturnUrl();
  }, []);

  return (
    <Container style={{
      background: `url(${background}) repeat center center fixed`,
      minWidth: '100vw', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
    }}>


      <div style={{
        backgroundSize: 'cover', backgroundColor: '#fff', background: 'rgba(255, 255, 255, 0.8)',
        minHeight: '70vh', maxWidth: '90vw', height: '100%',
        padding: '100px', borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {loading ?
          <Spinner /> :
          (
            <>
              <h1>Payment Result</h1>
            </>
          )}
        {paymentState ? (
          <>
            <BiCheckCircle size={500} color='green' />
            <h2>Payment Successful</h2>
          </>
        ) : (
          <>
            <BiXCircle size={500} color='red' />
            <h2>Payment Failed Please Try Again</h2>
          </>
        )}
        {(isVipUpgrade && paymentState) ? (
          <>
          <h2 style={{textAlign:'center'}}>Account upgraded to VIP signout then signin again to upgrade account</h2>
          <Button style={{maxHeight:'50px', maxWidth:'300px', height:'100%', width:"100%"}} onClick={() => logout()}>Log out</Button>
          </>
        ) : 
        <Button style={{maxHeight:'50px', maxWidth:'300px', height:'100%', width:"100%"}} onClick={() => navigate('/')}>back to home page</Button>
        }
      </div>
    </Container>
  );
};

export default PaymentResult;