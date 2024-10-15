import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button, Table } from 'react-bootstrap';
import { getShopByUserId } from '../../Config/ShopApi';
import { getProducts } from '../../Config/ProductApi';
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
    console.log(userId);

    const fetchShopDetails = useCallback(async () => {
        try {
            const shopData = await getShopByUserId(userId);
            if (shopData.thumbnail) {
                const storageRef = ref(storage, shopData.thumbnail);
                shopData.thumbnail = await getDownloadURL(storageRef);
            }
            setShop(shopData);
            fetchProducts(shopData.userId);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shop details:', error);
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchShopDetails();
    }, [fetchShopDetails]);

    const fetchProducts = async (shopUserId) => {
        try {
            const allProducts = await getProducts();
            const filteredProducts = allProducts.filter(product => product.userId === shopUserId);
            setProducts(filteredProducts);
        } catch (error) {
            console.error('Error fetching products:', error);
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
            <Card>
                <Card.Img variant="top" src={shop.thumbnail} alt="Shop Image" />
                <Card.Body>
                    <Card.Title>{shop.shopName}</Card.Title>
                    <Card.Text>
                        <strong>Description: </strong> {shop.description}
                    </Card.Text>
                    <Card.Text>
                        <strong>Phone: </strong> {shop.phone}
                    </Card.Text>
                    <Card.Text>
                        <strong>Email: </strong> {shop.email}
                    </Card.Text>
                    <Card.Text>
                        <strong>Rating: </strong> {shop.rating}
                    </Card.Text>
                    <Button variant="primary" onClick={() => setShowShopModal(true)}>Edit Shop Details</Button>
                </Card.Body>
            </Card>
            <UpdateShopDetails
                shop={shop}
                setShop={setShop}
                show={showShopModal}
                handleClose={() => setShowShopModal(false)}
            />
            <h2>Shop Products</h2>
            <Button variant="success" onClick={() => setShowAddProductModal(true)}>Add New Product</Button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
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
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>{product.status ? 'Available' : 'Unavailable'}</td>
                            <td>
                                <Button variant="warning" onClick={() => { setSelectedProduct(product); setShowProductModal(true); }}>
                                    Update
                                </Button>
                                <Button variant="danger" onClick={() => handleDeleteProduct(product.productId)}>
                                    Delete
                                </Button>
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