import React, { useState, useEffect, useCallback } from 'react';
import { Container, Card, CardImg, ListGroup, Button, Table, Row, Col, Carousel, Image, Spinner, Toast } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { getShopByUserId } from '../../Config/ShopApi';
import { getCategoryById } from '../../Config/CategoryApi';
import { getProductsByShopId, getProductImagesByProductId, addProduct, addProductImages, deleteProduct, getProductById, updateProduct } from '../../Config/ProductApi';
import UpdateShopDetails from '../../components/UpdateShopDetails/UpdateShopDetails';
import UpdateProduct from '../../components/UpdateProduct/UpdateProduct';
import AddNewProduct from '../../components/AddNewProduct/AddNewProduct';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { useAuth } from '../Login/AuthProvider';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

const ManageShop = () => {
    const [loading, setLoading] = useState(true);
    const [carouselLoading, setCarouselLoading] = useState(true);
    const [productImages, setProductImages] = useState([]);
    const [products, setProducts] = useState([]);
    const [shop, setShop] = useState(null);
    const [showShopModal, setShowShopModal] = useState(false);
    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const { user } = useAuth();
    const userId = user.userId;
    const [errorCategory, setErrorCategory] = useState(null);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);

    const fetchProductImages = useCallback(async (productId) => {
        try {
            const allImages = await getProductImagesByProductId(productId);
            const updatedImages = await Promise.all(allImages.map(async image => {
                if (image.imageUrl) {
                    try {
                        const storageRef = ref(storage, image.imageUrl);
                        image.imageUrl = await getDownloadURL(storageRef);
                    } catch (error) {
                        console.error('The file does not exist in firebase anymore!', error);
                        const storageRef = ref(storage, 'others/NotFound.jpg');
                        image.imageUrl = await getDownloadURL(storageRef);
                    }
                }
                return image;
            }));
            setProductImages(prevImages => [...prevImages, ...updatedImages]);
            setCarouselLoading(false);
        } catch (error) {
            console.error('Error fetching product images:', error);
        }
    }, []);

    const fetchProducts = useCallback(async (shopId) => {
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
                await fetchProductImages(product.productId);
                return product;
            }));
            setProducts(updatedProducts);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    }, [fetchProductImages]);

    const fetchShopDetails = useCallback(async () => {
        try {
            const shopData = await getShopByUserId(userId);
            console.log('shopData:', shopData);
            if (shopData.thumbnail) {
                try {
                    const storageRef = ref(storage, shopData.thumbnail);
                    shopData.thumbnail = await getDownloadURL(storageRef);
                } catch (error) {
                    console.error('The file does not exist in firebase anymore!', error);
                    const storageRef = ref(storage, 'others/NotFound.jpg');
                    shopData.thumbnail = await getDownloadURL(storageRef);
                }
            } else {
                console.error('The file does not exist in firebase anymore!');
                const storageRef = ref(storage, 'others/NotFound.jpg');
                shopData.thumbnail = await getDownloadURL(storageRef);
            }
            setShop(shopData);
            fetchProducts(shopData.shopId);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shop details:', error);
            setLoading(false);
        }
    }, [userId, fetchProducts]);

    useEffect(() => {
        fetchShopDetails();
    }, [fetchShopDetails]);

    const handleUpdateProduct = async (newProduct, imageFiles) => {

        await updateProduct(newProduct);
        const category = await getCategoryById(newProduct.categoryId);
        const updatedProduct = { ...newProduct, category: category };
        if (newProduct.thumbnail) {
            try {
                const storageRef = ref(storage, newProduct.thumbnail);
                newProduct.thumbnail = await getDownloadURL(storageRef);
            } catch (error) {
                console.error('The file does not exist in firebase anymore!', error);
                const storageRef = ref(storage, 'others/NotFound.jpg');
                newProduct.thumbnail = await getDownloadURL(storageRef);
            }
        }
        setProducts(products.map(product => product.productId === updatedProduct.productId ? updatedProduct : product));


        if (imageFiles && imageFiles.length > 0) {
            try {
                const validImageFiles = imageFiles.filter(file => file !== null && file !== undefined);

                const imageUploadPromises = validImageFiles.map(async (file) => {
                    const imageRef = ref(storage, `product/productImages/${userId}/ProductId:${updatedProduct.productId}_${Date.now()}_${file.name}}`);
                    await uploadBytes(imageRef, file);
                    return { productId: updatedProduct.productId, imageUrl: imageRef.fullPath };
                });

                const uploadedImages = await Promise.all(imageUploadPromises.map(async (imagePromise) => {
                    try {
                        const image = await imagePromise;
                        const addedImage = await addProductImages(image);
                        const storageRef = ref(storage, addedImage.imageUrl);
                        addedImage.imageUrl = await getDownloadURL(storageRef);
                        return addedImage;
                    } catch (error) {
                        console.error('Error uploading image:', error);
                        return null;
                    }
                }));

                const validUploadedImages = uploadedImages.filter(image => image !== null);
                const filteredProductImages = productImages.filter(image => image.productId !== updatedProduct.productId);

                setProductImages([...filteredProductImages,...validUploadedImages]);
                setCarouselLoading(false);
                setToastMessage('Product updated successfully.');
                setShowToast(true);
            } catch (error) {
                console.error('Error updating product images:', error);
                setToastMessage('Error updating product.');
                setShowToast(true);
            }
        } else {
            setToastMessage('Product updated successfully.');
            setShowToast(true);
        }
    };

    const handleDeleteProduct = async (productId) => {
        setProductIdToDelete(productId);
        setShowConfirmModal(true);
    };

    const confirmDeleteProduct = async () => {
        setShowConfirmModal(false);
        const productId = productIdToDelete;

        try {
            const allImages = await getProductImagesByProductId(productId);
            await Promise.all(allImages.map(async image => {
                if (image.imageUrl) {
                    try {
                        const storageRef = ref(storage, image.imageUrl);
                        await deleteObject(storageRef);
                    } catch (error) {
                        console.error('Erro delete product images: ', error);
                    }
                }
            }));

            const product = await getProductById(productId);
            if (product && product.thumbnail !== 'others/NotFound.jpg') {
                try {
                    const storageRef = ref(storage, product.thumbnail);
                    await deleteObject(storageRef);
                } catch (error) {
                    console.error('Error deleting product thumbnail:', error);
                }
            } else {
                console.error('The file does not exist in firebase!');
            }

            await deleteProduct(productId);

            setProducts(products.filter(product => product.productId !== productId));
            console.log('Product deleted successfully');
            setToastMessage('Product deleted successfully.');
            setShowToast(true);
        } catch (error) {
            console.error('Error deleting product:', error);
            setToastMessage('Error deleting product.');
            setShowToast(true);
        }
    };

    const handleAddProduct = async (newProduct, imageFiles) => {
        try {
            console.log('newProduct:', newProduct);
            const category = await getCategoryById(newProduct.categoryId);
            setErrorCategory(category);
            newProduct.categoryId = category.categoryId;
            const addedProduct = await addProduct(newProduct);
            console.log('addedProduct:', addedProduct);
            const storageRef = ref(storage, addedProduct.thumbnail);
            addedProduct.thumbnail = await getDownloadURL(storageRef);

            if (!imageFiles || imageFiles.length === 0) {
                setProducts([...products, addedProduct]);
                setToastMessage('Product added successfully.');
                setShowToast(true);
                return;
            }

            const validImageFiles = imageFiles.filter(file => file !== null && file !== undefined);

            if (validImageFiles.length === 0) {
                setProducts([...products, addedProduct]);
                setToastMessage('Product added successfully.');
                setShowToast(true);
                return;
            }

            const imageUploadPromises = validImageFiles.map(async (file) => {
                const imageRef = ref(storage, `product/productImages/${userId}/ProductId:${addedProduct.productId}_${Date.now()}_${file.name}`);
                await uploadBytes(imageRef, file);
                return { productId: addedProduct.productId, imageUrl: imageRef.fullPath };
            });

            const uploadedImages = await Promise.all(imageUploadPromises.map(async (imagePromise) => {
                try {
                    const image = await imagePromise;
                    const addedImage = await addProductImages(image);
                    const storageRef = ref(storage, addedImage.imageUrl);
                    addedImage.imageUrl = await getDownloadURL(storageRef);
                    return addedImage;
                } catch (error) {
                    console.error('Error uploading image:', error);
                    return null;
                }
            }));

            const validUploadedImages = uploadedImages.filter(image => image !== null);

            setProductImages([...productImages, ...validUploadedImages]);
            setCarouselLoading(false);
            setProducts([...products, addedProduct]);
            setToastMessage('Product added successfully.');
            setShowToast(true);
        } catch (error) {
            console.error('Error adding product:', error);
            setToastMessage('Error adding product.');
            setShowToast(true);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <Card className="mb-4 shadow-sm">
                <Row>
                    <Col md={4}>
                        <Card.Img style={{ objectFit: 'cover', width: '300px' }} variant="top" src={shop.thumbnail} alt="Shop Thumbnail" className="h-100" />
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
                        <th style={{ width: '100px' }}>Thumbnail</th>
                        <th style={{ width: '150px' }}>Product Images</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th style={{ width: '150px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId}>
                            <td className="d-flex justify-content-center align-items-center">
                                <CardImg src={product.thumbnail} alt='Product Thumbnail' style={{ objectFit: 'fill', width: '75px' }} />
                            </td>
                            <td>
                                {carouselLoading ? (
                                    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                                        <Spinner animation="border" size="xl" role="status" />
                                    </div>
                                ) : (
                                    <Carousel variant="dark">
                                        {[...new Set(productImages.filter(image => image.productId === product.productId).map(image => image.imageId))]
                                            .map(imageId => {
                                                const productImage = productImages.find(image => image.imageId === imageId);
                                                if (!productImage) return null;
                                                return (
                                                    <Carousel.Item key={productImage.imageId} style={{ textAlign: 'center' }}>
                                                        <Image src={productImage.imageUrl} alt={`${product.name} image ${productImage.imageId}`} style={{ objectFit: 'fill', width: '75px' }} fluid />
                                                    </Carousel.Item>
                                                );
                                            })}
                                    </Carousel>
                                )}
                            </td>
                            <td>{product.name}</td>
                            <td>{product.category ? product.category.name : errorCategory.name}</td>
                            <td>{product.description}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price}</td>
                            <td>{product.status ? 'Available' : 'Unavailable'}</td>
                            <td>
                                <div className="d-flex">
                                    <Button variant="warning" className="me-2" onClick={() => { setSelectedProduct(product); setShowUpdateProductModal(true); }}>
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDeleteProduct(product.productId)}>
                                        Delete
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {selectedProduct && (
                <UpdateProduct
                    product={selectedProduct}
                    show={showUpdateProductModal}
                    handleClose={() => { setShowUpdateProductModal(false); setSelectedProduct(null); }}
                    handleUpdateProduct={handleUpdateProduct}
                />
            )}
            <AddNewProduct
                show={showAddProductModal}
                handleClose={() => setShowAddProductModal(false)}
                handleAddProduct={handleAddProduct}
                shopId={shop.shopId}
            />
            {createPortal(
                <Toast
                    onClose={() => setShowToast(false)}
                    show={showToast}
                    delay={5000}
                    autohide
                    bg={toastMessage === 'Error adding product.' ||
                        toastMessage === 'Error updating product.' ||
                        toastMessage === 'Error deleting product.' ? 'danger' : 'success'}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        right: '20px',
                        zIndex: 1050,
                    }}
                >
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{toastMessage}</Toast.Body>
                </Toast>,
                document.body
            )}
            <ConfirmModal
                show={showConfirmModal}
                handleClose={() => setShowConfirmModal(false)}
                handleConfirm={confirmDeleteProduct}
                message="Are you sure you want to delete this product?"
            />
        </Container>
    );
};

export default ManageShop;