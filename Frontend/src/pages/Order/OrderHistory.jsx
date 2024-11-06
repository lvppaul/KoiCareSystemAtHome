import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Tabs, Tab } from 'react-bootstrap';
import { useAuth } from '../Login/AuthProvider';
import { getOrderByUserId, getOrderById } from '../../Config/OrderApi';
import { getProductById } from '../../Config/ProductApi';
import { getVipPackageByOrderId } from '../../Config/VipPackageApi';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [vipOrders, setVipOrders] = useState([]);
    const [regularOrders, setRegularOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const userId = useAuth().user.userId;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const orderData = await getOrderByUserId(userId);
                setOrders(orderData);
                getVipOrders(orderData);
                getRegularOrders(orderData);
            } catch (err) {
                setError('Failed to fetch order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getVipOrders = async (orders) => {
        const filteredVipOrders = orders.filter(order => order.isVipUpgrade);
        try {
            const vipOrderData = await Promise.all(
                filteredVipOrders.map(async (order) => {
                    const vipPackage = await getVipPackageByOrderId(order.orderId);
                    return { ...order, vipPackage };
                })
            );
            setVipOrders(vipOrderData);
        } catch (error) {
            console.error('Error fetching VIP orders:', error);
        }
    };

    const getRegularOrders = async (orders) => {
        const filteredRegularOrders = orders.filter(order => !order.isVipUpgrade);
        try {
            const regularOrderData = await Promise.all(
                filteredRegularOrders.map(async (order) => {
                    const regularOrder = await getOrderById(order.orderId);
                    const productDetails = await Promise.all(
                        regularOrder.orderDetails.map(async (product) => {
                            const productData = await getProductById(product.productId);
                            return { ...product, productData };
                        })
                    );
                    return { ...order, regularOrder: { ...regularOrder, orderDetails: productDetails } };
                })
            );
            setRegularOrders(regularOrderData);
        } catch (error) {
            console.error('Error fetching regular orders:', error);
        }
    };

    if (loading) {
        return <Spinner animation="border" />;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vn-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const renderTable = (orders) => (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Order Detail</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    {/* Add more headers as needed */}
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>
                            {order.isVipUpgrade ? order.vipPackage.name : (
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.regularOrder.orderDetails.map(product => (
                                            <tr key={product.productId}>
                                                <td>{product.productData.name}</td>
                                                <td>{product.quantity}</td>
                                                <td>{formatPrice(product.productData.price)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </td>
                        <td>{formatDate(order.createDate)}</td>
                        <td>{order.isVipUpgrade ? formatPrice(order.vipPackage.price) : formatPrice(order.regularOrder.totalPrice)}</td>
                        <td>{order.orderStatus}</td>
                        {/* Add more order details as needed */}
                    </tr>
                ))}
            </tbody>
        </Table>
    );

    return (
        <div>
            
            <h1>Order History</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <Tabs defaultActiveKey="regular" id="order-history-tabs">
                    <Tab eventKey="regular" title="Regular Orders">
                        {renderTable(regularOrders)}
                    </Tab>
                    <Tab eventKey="vip" title="VIP Upgrade Orders">
                        {renderTable(vipOrders)}
                    </Tab>
                </Tabs>
            )}
        </div>
    );
};

export default OrderHistory;