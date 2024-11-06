import { Modal,Form, Button } from 'react-bootstrap'
import { useAuth } from '../Login/AuthProvider';
import { orderVipPackage } from '../../Config/VipPackageApi';
import { sendPayment } from '../../Config/VNPayApi';

const OrderVip = ({show, setShow, data}) => {
    const userId = useAuth().user.userId;
    const orderVipDetails = { "vipId": data.vipId};
    const dataOrder = { "userId": userId, "orderVipDetails": [orderVipDetails] };
    const email = useAuth().user.email;

    const handleOrderVip = async () => {
        try {
            console.log('data order',dataOrder);
            const response = await orderVipPackage(dataOrder);
            if(response.status === 201){
                const orderDetail = response.data.orderVipDetails;
                const payload = {
                    orderId: orderDetail[0].orderId,
                    fullName: email,
                    description: 'Order Vip Package ' + data.name,
                };
                localStorage.setItem('orderId', orderDetail[0].orderId);
                const vnpayresponse = await sendPayment(payload);
                if (vnpayresponse) {
                // console.log('Redirecting to:', response);
                window.location.href = vnpayresponse;
                } else {
                console.error("Error: No URL returned from API");
                }
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Order Vip Failed');
        }
    }

    const formatPrice = (price) => {
        if (price === undefined || price === null) {
            return 'N/A';
        }
        return price.toLocaleString();
    };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
            <Modal.Title>Order Vip Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
            <Form.Group controlId="formPackName" className="mb-3">
                        <Form.Label>Package Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={data.name}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPackagePrice" className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={formatPrice(data.price)}
                        />
                    </Form.Group>
                    <div style={{display:'flex', justifyContent:'flex-end' , alignItems:'center'}}>
                    <Button onClick={handleOrderVip} style={{background: 'rgba(0, 0, 0, 1)', backgroundColor:'#FF4900', opacity: 1, minWidth:'140px'}}>
                        Order Confirm
                    </Button>
                    <Button style={{minWidth:'140px'}} variant="secondary" onClick={() => setShow(false)}>
                        Close
                    </Button>
                    </div>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default OrderVip