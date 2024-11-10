import { useState, useEffect } from 'react'
import { Modal, Table } from 'react-bootstrap'
import { getOrderById } from '../../Config/OrderApi'
import ProductNameComponent from './ProductNameComponent'
import VipPackageName from './VipPackageName'

const OrderDetail = ({ show, setShow, orderId }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderDetail, setOrderDetail] = useState(null);

    const fetchOrderDetail = async () => {
        try {
            const response = await getOrderById(orderId);
            console.log('order detail:', response);
            if (response.orderId) {
                setOrderDetail(response);
            } else {
                setError('Error fetching order detail');
            }
        }
        catch (error) {
            setError('Error fetching order detail');
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOrderDetail();
    }, [orderId]);

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    return (
        <Modal show={show} onHide={() => setShow(false)} size='xl'>
            <Modal.Header closeButton>
                <Modal.Title>Order Detail</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Loading...</p>
                ) : orderDetail ? (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>OrderId</th>
                                <th>OrderDetail</th>
                                {!orderDetail.isVipUpgrade ? (
                                <>
                                <th>Price</th>
                                <th>Address</th>
                                <th>Order Date</th>
                                </>
                            )
                                : null}
                                <th>Phone Number</th>
                                
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{orderDetail.orderId}</td>
                                <td>{!orderDetail.isVipUpgrade ? (
                                    <Table striped bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "250px" }}>Product</th>
                                                <th style={{ width: "150px" }}>Quantity</th>
                                                <th style={{ width: "150px" }}>Price</th>
                                            </tr>
                                        </thead>
                                        {orderDetail.orderDetails.map((orderDetail, index) => (
                                            <tbody key={index}>
                                                <tr>
                                                    <td>{<ProductNameComponent productId={orderDetail.productId} />}</td>
                                                    <td>{orderDetail.quantity}</td>
                                                    <td>{formatPrice(orderDetail.unitPrice)}</td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </Table>
                                ) : (
                                    <p>
                                        Vip Package Order (please check order history)
                                    </p>
                                )}</td>
                                {!orderDetail.isVipUpgrade ? (
                                <>
                                <td>{formatPrice(orderDetail.totalPrice)}</td>
                                <td>{`${orderDetail.street}  ${orderDetail.district} ${orderDetail.city} ${orderDetail.country}`}</td>
                                <td>{formatDate(orderDetail.createDate)}</td>
                                </>)    
                                : null}
                                <td>{orderDetail.phone}</td>
                                <td>{orderDetail.email}</td>
                            </tr>
                        </tbody>
                    </Table>
                ) : (
                    <p>{error}</p>
                )}
            </Modal.Body>
        </Modal>
    )
}

export default OrderDetail