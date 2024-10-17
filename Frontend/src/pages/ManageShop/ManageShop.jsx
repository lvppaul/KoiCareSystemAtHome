import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, Button, Table, CardImg } from 'react-bootstrap';
import { getShopByUserId } from '../../Config/ShopApi';
import { getProductByUserId } from '../../Config/ProductApi';
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
            const allProducts = await getProductByUserId(shopUserId);
            const updatedProducts = await Promise.all(allProducts.map(async product => {
                console.log('Fetched product:', product);
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
            <Card>
                <Card.Img variant="top" src={shop.thumbnail} alt="Shop Thumbnail" />
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