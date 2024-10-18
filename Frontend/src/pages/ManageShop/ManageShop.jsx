import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, CardImg, ListGroup, Button, Table, Row, Col } from 'react-bootstrap';
import { getShopByUserId } from '../../Config/ShopApi';
import { getProductsByShopId } from '../../Config/ProductApi';
import UpdateShopDetails from '../../components/UpdateShopDetails/UpdateShopDetails';
import UpdateShopProducts from '../../components/UpdateShopProducts/UpdateShopProducts';
import AddNewProduct from '../../components/AddNewProduct/AddNewProduct';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { useAuth } from '../Login/AuthProvider';

const ManageShop = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [shop, setShop] = useState(null);
    const [showShopModal, setShowShopModal] = useState(false);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { user } = useAuth();
    const userId = user.userId;

    const fetchShopDetails = useCallback(async () => {
        try {
            const shopData = await getShopByUserId(userId);
            if (shopData.thumbnail) {
                try {
                    const storageRef = ref(storage, shopData.thumbnail);
                    shopData.thumbnail = await getDownloadURL(storageRef);
                } catch (error) {
                    console.error('The file does not exist in firebase anymore!', error);
                    const storageRef = ref(storage, 'others/NotFound.jpg');
                    shopData.thumbnail = await getDownloadURL(storageRef);
                }
            }
            setShop(shopData);
            fetchProducts(shopData.shopId);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shop details:', error);
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchShopDetails();
    }, [fetchShopDetails]);

    const fetchProducts = async (shopId) => {
        try {
            const allProducts = await getProductsByShopId(shopId);
            const updatedProducts = await Promise.all(allProducts.map(async product => {
                if (product.thumbnail) {
                    try {
                        const storageRef = ref(storage, product.thumbnail);
                        product.thumbnail = await getDownloadURL(storageRef);
                    } catch (error) {
                        console.error('The file does not exist in firebase anymore!', error);
                        const storageRef = ref(storage, 'others/NotFound.jpg');
                        product.thumbnail = await getDownloadURL(storageRef);
                    }
                }
                return product;
            }));
            setProducts(updatedProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    const handleUpdateProduct = (updatedProduct) => {
        setProducts(products.map(product => product.productId === updatedProduct.productId ? updatedProduct : product));
    };

    const handleDeleteProduct = (productId) => {
        setProducts(products.filter(product => product.productId !== productId));
    };

    const handleAddProduct = (newProduct) => {
        setProducts([...products, { ...newProduct, userId }]);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Card className="mb-4 shadow-sm">
                <Row noGutters>
                    <Col md={4}>
                        <Card.Img variant="top" src={shop.thumbnail} alt="Shop Thumbnail" className="h-100" />
                    </Col>
                    <Col md={8}>
                        <Card.Body>
                            <Card.Title className="text-center">{shop.shopName}</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Description: </strong> {shop.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Phone: </strong> {shop.phone}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Email: </strong> {shop.email}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Rating: </strong> {shop.rating}
                                </ListGroup.Item>
                            </ListGroup>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" onClick={() => setShowShopModal(true)}>Edit Shop Details</Button>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
            <UpdateShopDetails
                shop={shop}
                setShop={setShop}
                show={showShopModal}
                handleClose={() => setShowShopModal(false)}
            />
            <h2>Shop Products</h2>
            <Row className="mb-3">
                <Col className="d-flex justify-content-end">
                    <Button variant="success" onClick={() => setShowAddProductModal(true)}>Add New Product</Button>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Thumbnail</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td><CardImg src={product.thumbnail} alt='Product Thumbnail' style={{ width: '70px', height: '70px' }} /></td>
                            <td>{product.name}</td>
                            <td>{product.category.name}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.status ? 'Available' : 'Unavailable'}</td>
                            <td>
                                <div className="d-flex">
                                    <Button variant="warning" className="me-2" onClick={() => { setSelectedProduct(product); setShowProductModal(true); }}>
                                        Update
                                    </Button>
                                    <Button variant="danger"  onClick={() => handleDeleteProduct(product.productId)}>
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedProduct && (
                <UpdateShopProducts
                    product={selectedProduct}
                    show={showProductModal}
                    handleClose={() => setShowProductModal(false)}
                    handleUpdate={handleUpdateProduct}
                />
            )}
            <AddNewProduct
                show={showAddProductModal}
                handleClose={() => setShowAddProductModal(false)}
                handleAddProduct={handleAddProduct}
            />
        </Container>
    );
};

export default ManageShop;