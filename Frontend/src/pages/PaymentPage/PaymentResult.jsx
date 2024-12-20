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
import { getPDF } from '../../Config/VNPayApi';
import OrderDetail from '../Order/OrderDetail';

const PaymentResult = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentState, setPaymentState] = useState(false);
  const returnUrl = window.location.href;
  const [isVipUpgrade, setIsVipUpgrade] = useState(false);
  const { logout } = useAuth();
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('vnp_OrderInfo');
    setOrderId(orderId);
  }, []);

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

  const handleExportPDF = async () => {
    console.log('Exporting PDF');
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('vnp_OrderInfo');
    if (orderId) {
      try {
        const response = await getPDF(orderId);
        if (response) {
          const pdfData = await response.data;
          console.log('pdfData:', typeof pdfData);
          const blob = new Blob([pdfData], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `Invoice_${orderId}.pdf`;
          link.click();
          console.log('PDF exported successfully:');
        } else {
          console.error('No data in response:', response);
        }
      } catch (error) {
        console.error('Error exporting PDF:', error);
      }
    } else {
      console.error('Order ID not found in URL');
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
            {!isVipUpgrade ? 
            (<>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'space-evenly' }}>
              <Button onClick={handleExportPDF} style={{ maxHeight: '50px', maxWidth: '300px', height: '100%', width: "100%", marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>Export billing</Button>
              {/* <Button onClick={() => setShowOrderDetail(true)} style={{ maxHeight: '50px', maxWidth: '300px', height: '100%', width: "100%", marginBottom: '20px', fontWeight: 'bold', fontSize: '20px' }}>Order Detail</Button> */}
            </div>
            </>)
            : null}
          </>
        ) : (
          <>
            <BiXCircle size={500} color='red' />
            <h2>Payment Failed Please Try Again in Order History</h2>
          </>
        )}
        {(isVipUpgrade && paymentState) ? (
          <>
            <h2 style={{ textAlign: 'center' }}>Account upgraded to VIP signout then signin again to upgrade account</h2>
            <Button style={{ maxHeight: '50px', maxWidth: '300px', height: '100%', width: "100%", fontWeight: 'bold', fontSize: '20px' }} onClick={() => logout()}>Log out</Button>
          </>
        ) :
          <Button style={{ maxHeight: '50px', maxWidth: '300px', height: '100%', width: "100%", fontWeight: 'bold', fontSize: '20px' }} onClick={() => navigate('/')}>back to home page</Button>
        }
      </div>
      <OrderDetail
        show={showOrderDetail}
        setShow={setShowOrderDetail}
        orderId={orderId}
      />
    </Container>
  );
};

export default PaymentResult;