import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  Container,
  Card,
  CardImg,
  ListGroup,
  Button,
  Table,
  Row,
  Col,
  Carousel,
  Image,
  Spinner,
  Pagination,
  Nav,
  Form,
} from "react-bootstrap";
import { getShopByUserId } from "../../Config/ShopApi";
import { getCategoryById, getCategories } from "../../Config/CategoryApi";
import {
  getProductsByShopId,
  getProductImagesByProductId,
  addProduct,
  addProductImages,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../Config/ProductApi";
import UpdateShopDetails from "../../components/UpdateShopDetails/UpdateShopDetails";
import UpdateProduct from "../../components/UpdateProduct/UpdateProduct";
import AddNewProduct from "../../components/AddNewProduct/AddNewProduct";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { useAuth } from "../Login/AuthProvider";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { ToastContext } from "../../App";
import { getProductDiscontinued, getProductInStock, getProdcutOutOfStock, getProductsByShopIdAndCategoryId } from "../../Config/ProductApi";

const ManageShop = () => {
  const { setToastMessage } = useContext(ToastContext);
  const { user } = useAuth();
  const userId = user?.userId;

  const [loading, setLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);
  const [productImages, setProductImages] = useState([]);
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState(null);
  const [showShopModal, setShowShopModal] = useState(false);
  const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [errorCategory, setErrorCategory] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7;
  const [filterType, setFilterType] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const fetchProductImages = useCallback(async (productId) => {
    try {
      const allImages = await getProductImagesByProductId(productId);
      const updatedImages = await Promise.all(
        allImages.map(async (image) => {
          if (image.imageUrl) {
            try {
              const storageRef = ref(storage, image.imageUrl);
              image.imageUrl = await getDownloadURL(storageRef);
            } catch (error) {
              console.error("The file does not exist in firebase anymore!", error);
              const storageRef = ref(storage, "others/NotFound.jpg");
              image.imageUrl = await getDownloadURL(storageRef);
            }
          }
          return image;
        })
      );
      setProductImages((prevImages) => [...prevImages, ...updatedImages]);
      setCarouselLoading(false);
    } catch (error) {
      console.error("Error fetching product images:", error);
    }
  }, []);

  const fetchProducts = useCallback(
    async (shopId) => {
      try {
        const allProducts = await getProductsByShopId(shopId);
        const updatedProducts = await Promise.all(
          allProducts.map(async (product) => {
            if (product.thumbnail) {
              try {
                const storageRef = ref(storage, product.thumbnail);
                product.thumbnail = await getDownloadURL(storageRef);
              } catch (error) {
                console.error("The file does not exist in firebase anymore!", error);
                const storageRef = ref(storage, "others/NotFound.jpg");
                product.thumbnail = await getDownloadURL(storageRef);
              }
            }
            await fetchProductImages(product.productId);
            return product;
          })
        );
        setProducts(updatedProducts);
        setLoading(false);
        setProductLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
        setProductLoading(false);
      }
    },
    [fetchProductImages]
  );

  const fetchShopDetails = useCallback(async () => {
    try {
      const shopData = await getShopByUserId(userId);
      console.log("shopData:", shopData);
      if (shopData.thumbnail) {
        try {
          const storageRef = ref(storage, shopData.thumbnail);
          shopData.thumbnail = await getDownloadURL(storageRef);
        } catch (error) {
          console.error("The file does not exist in firebase anymore!", error);
          const storageRef = ref(storage, "others/NotFound.jpg");
          shopData.thumbnail = await getDownloadURL(storageRef);
        }
      } else {
        console.error("The file does not exist in firebase anymore!");
        const storageRef = ref(storage, "others/NotFound.jpg");
        shopData.thumbnail = await getDownloadURL(storageRef);
      }
      setShop(shopData);
      fetchProducts(shopData.shopId);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching shop details:", error);
      setLoading(false);
    }
  }, [userId, fetchProducts]);

  useEffect(() => {
    fetchShopDetails();
  }, [fetchShopDetails]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleUpdateProduct = async (newProduct, imageFiles) => {
    await updateProduct(newProduct);
    const category = await getCategoryById(newProduct.categoryId);
    const updatedProduct = { ...newProduct, category: category };
    if (updatedProduct.thumbnail) {
      try {
        const storageRef = ref(storage, updatedProduct.thumbnail);
        updatedProduct.thumbnail = await getDownloadURL(storageRef);
      } catch (error) {
        console.error("The file does not exist in firebase anymore!", error);
        const storageRef = ref(storage, "others/NotFound.jpg");
        updatedProduct.thumbnail = await getDownloadURL(storageRef);
      }
    }
    setProducts(products.map((product) => (product.productId === updatedProduct.productId ? updatedProduct : product)));
    console.log("Product updated successfully", updatedProduct);
    console.log("product", products);

    if (imageFiles && imageFiles.length > 0) {
      try {
        const validImageFiles = imageFiles.filter((file) => file !== null && file !== undefined);

        const imageUploadPromises = validImageFiles.map(async (file) => {
          const imageRef = ref(
            storage,
            `product/productImages/${userId}/ProductId:${updatedProduct.productId}_${Date.now()}_${file.name}}`
          );
          await uploadBytes(imageRef, file);
          return {
            productId: updatedProduct.productId,
            imageUrl: imageRef.fullPath,
          };
        });

        const uploadedImages = await Promise.all(
          imageUploadPromises.map(async (imagePromise) => {
            try {
              const image = await imagePromise;
              const addedImage = await addProductImages(image);
              const storageRef = ref(storage, addedImage.imageUrl);
              addedImage.imageUrl = await getDownloadURL(storageRef);
              return addedImage;
            } catch (error) {
              console.error("Error uploading image:", error);
              return null;
            }
          })
        );

        const validUploadedImages = uploadedImages.filter((image) => image !== null);
        const filteredProductImages = productImages.filter((image) => image.productId !== updatedProduct.productId);

        setProductImages([...filteredProductImages, ...validUploadedImages]);
        setCarouselLoading(false);
        setToastMessage("Product updated successfully");
      } catch (error) {
        console.error("Error updating product images:", error);
        setToastMessage("Error updating product");
      }
    } else {
      setToastMessage("Product updated successfully");
    }
  };

  const handleDeleteProduct = async (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmModal(true);
  };

  const confirmDeleteProduct = async () => {
    setShowConfirmModal(false);
    const productId = productIdToDelete;
    const notFound = await getDownloadURL(ref(storage, "others/NotFound.jpg"));

    try {
      const allImages = await getProductImagesByProductId(productId);
      await Promise.all(
        allImages.map(async (image) => {
          if (image.imageUrl && image.imageUrl !== notFound && image.imageUrl !== "others/NotFound.jpg") {
            try {
              const storageRef = ref(storage, image.imageUrl);
              await deleteObject(storageRef);
            } catch (error) {
              console.error("Erro delete product images: ", error);
            }
          }
        })
      );

      const product = await getProductById(productId);
      if (product.thumbnail && product.thumbnail !== notFound && product.thumbnail !== "others/NotFound.jpg") {
        try {
          const storageRef = ref(storage, product.thumbnail);
          await deleteObject(storageRef);
        } catch (error) {
          console.error("Error deleting product thumbnail:", error);
        }
      } else {
        console.error("The file does not exist in firebase!");
      }

      await deleteProduct(productId);

      setProducts(products.filter((product) => product.productId !== productId));
      console.log("Product deleted successfully");
      setToastMessage("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      setToastMessage("Error deleting product");
    }
  };

  const handleAddProduct = async (newProduct, imageFiles) => {
    try {
      console.log("newProduct:", newProduct);
      const category = await getCategoryById(newProduct.categoryId);
      setErrorCategory(category);
      newProduct.categoryId = category.categoryId;
      const addedProduct = await addProduct(newProduct);
      console.log("addedProduct:", addedProduct);
      const storageRef = ref(storage, addedProduct.thumbnail);
      addedProduct.thumbnail = await getDownloadURL(storageRef);

      if (!imageFiles || imageFiles.length === 0) {
        setProducts([...products, addedProduct]);
        setToastMessage("Product added successfully");
        return;
      }

      const validImageFiles = imageFiles.filter((file) => file !== null && file !== undefined);

      if (validImageFiles.length === 0) {
        setProducts([...products, addedProduct]);
        setToastMessage("Product added successfully");
        return;
      }

      const imageUploadPromises = validImageFiles.map(async (file) => {
        const imageRef = ref(
          storage,
          `product/productImages/${userId}/ProductId:${addedProduct.productId}_${Date.now()}_${file.name}`
        );
        await uploadBytes(imageRef, file);
        return {
          productId: addedProduct.productId,
          imageUrl: imageRef.fullPath,
        };
      });

      const uploadedImages = await Promise.all(
        imageUploadPromises.map(async (imagePromise) => {
          try {
            const image = await imagePromise;
            const addedImage = await addProductImages(image);
            const storageRef = ref(storage, addedImage.imageUrl);
            addedImage.imageUrl = await getDownloadURL(storageRef);
            return addedImage;
          } catch (error) {
            console.error("Error uploading image:", error);
            return null;
          }
        })
      );

      const validUploadedImages = uploadedImages.filter((image) => image !== null);

      setProductImages([...productImages, ...validUploadedImages]);
      setCarouselLoading(false);
      setProducts([...products, addedProduct]);
      setToastMessage("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      setToastMessage("Error adding product");
    }
  };

  const handleFilterChange = async (type) => {
    setFilterType(type);
    setCurrentPage(1);
    
    if (!shop) return;

    try {
      let filteredProducts;
      switch (type) {
        case "outOfStock":
          filteredProducts = await getProdcutOutOfStock(shop.shopId);
          break;
        case "discontinued":
          filteredProducts = await getProductDiscontinued(shop.shopId);
          break;
        case "inStock":
          filteredProducts = await getProductInStock(shop.shopId);
          break;
        default:
          filteredProducts = await getProductsByShopId(shop.shopId);
      }

      const updatedProducts = await Promise.all(
        filteredProducts.map(async (product) => {
          if (product.thumbnail) {
            try {
              const storageRef = ref(storage, product.thumbnail);
              product.thumbnail = await getDownloadURL(storageRef);
            } catch (error) {
              const storageRef = ref(storage, "others/NotFound.jpg");
              product.thumbnail = await getDownloadURL(storageRef);
            }
          }
          return product;
        })
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  const handleCategoryChange = async (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    
    if (!shop) return;

    try {
      let filteredProducts;
      if (categoryId === "all") {
        filteredProducts = await getProductsByShopId(shop.shopId);
      } else {
        filteredProducts = await getProductsByShopIdAndCategoryId(shop.shopId, categoryId);
      }

      const updatedProducts = await Promise.all(
        filteredProducts.map(async (product) => {
          if (product.thumbnail) {
            try {
              const storageRef = ref(storage, product.thumbnail);
              product.thumbnail = await getDownloadURL(storageRef);
            } catch (error) {
              const storageRef = ref(storage, "others/NotFound.jpg");
              product.thumbnail = await getDownloadURL(storageRef);
            }
          }
          return product;
        })
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error filtering products by category:", error);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(products.length / productsPerPage)));
  const prevPage = () => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vn-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5" style={{ height: "100%" }}>
        <Spinner animation="border" size="xl" role="status" />
      </div>
    );
  }

  return (
    <Container className="p-3">
      <Nav className="nav-tabs-login" variant="tabs" defaultActiveKey="/manageShop">
        <Nav.Item>
          <Nav.Link href="/manageShop">Manage Shop</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="shopOrder" href="/shopOrder">
            Orders
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="shopRevenue" href="/shopRevenue">
            Revenue
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Container style={{ borderTop: "1px solid gray" }}>
        <Container className="mb-4 shadow-sm p-3 mt-3" style={{ background: "white" }}>
          <Row>
            <Col md={4}>
              <Card.Img
                style={{ objectFit: "cover", width: "300px" }}
                variant="top"
                src={shop.thumbnail}
                alt="Shop Thumbnail"
                className="h-100"
              />
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
                  <Button variant="primary" onClick={() => setShowShopModal(true)}>
                    Edit Shop Details
                  </Button>
                </div>
              </Card.Body>
            </Col>
          </Row>
        </Container>
        <UpdateShopDetails
          shop={shop}
          setShop={setShop}
          show={showShopModal}
          handleClose={() => setShowShopModal(false)}
        />
        <h2>Shop Products</h2>
        <Row className="mb-3 mt-3">
          <Col md={3}>
          <Form.Label>Filter by status:</Form.Label>
            <Form.Select value={filterType} onChange={(e) => handleFilterChange(e.target.value)}>
              <option value="all">All Products</option>
              <option value="inStock">In Stock</option>
              <option value="outOfStock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </Form.Select>
          </Col>
          <Col md={3}>
            <Form.Label>Filter by category:</Form.Label>
            <Form.Select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={6} className="d-flex justify-content-end">
            <Button style={{fontSize: '36px', width: '65px'}} variant="success" onClick={() => setShowAddProductModal(true)}>
              +
            </Button>
          </Col>
        </Row>
        {productLoading ? (
          <div className="d-flex justify-content-center align-items-center mt-5 mb-5" style={{ height: "100%" }}>
            <Spinner animation="border" size="xl" role="status" />
          </div>
        ) : (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "100px" }}>Thumbnail</th>
                  <th style={{ width: "150px" }}>Product Images</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Expired Date</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.productId}>
                    <td className="d-flex justify-content-center align-items-center">
                      <CardImg
                        src={product.thumbnail}
                        alt="Product Thumbnail"
                        style={{ objectFit: "cover", width: "75px", height: "75px" }}
                      />
                    </td>
                    <td>
                      {carouselLoading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                          <Spinner animation="border" size="xl" role="status" />
                        </div>
                      ) : (
                        <Carousel variant="dark" indicators={false}>
                          {[
                            ...new Set(
                              productImages
                                .filter((image) => image.productId === product.productId)
                                .map((image) => image.imageId)
                            ),
                          ].map((imageId) => {
                            const productImage = productImages.find((image) => image.imageId === imageId);
                            if (!productImage) return null;
                            return (
                              <Carousel.Item key={productImage.imageId} style={{ textAlign: "center" }}>
                                <Image
                                  src={productImage.imageUrl}
                                  alt={`${product.name} image ${productImage.imageId}`}
                                  style={{ objectFit: "cover", width: "75px", height: "75px" }}
                                  fluid
                                />
                              </Carousel.Item>
                            );
                          })}
                        </Carousel>
                      )}
                    </td>
                    <td>{product.name}</td>
                    <td>{product.category ? product.category.name : errorCategory.name}</td>
                    <td>{product.description}</td>
                    {product.category.name === "Pond Equipment" ? (
                      <td>None</td>
                    ) : (
                      <td>{formatDate(product.expiredDate)}</td>
                    )}
                    <td>{product.quantity}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>{product.status}</td>
                    <td>
                      <div className="d-flex">
                        <Button
                          variant="warning"
                          className="me-2"
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowUpdateProductModal(true);
                          }}
                        >
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
            <Pagination className="d-flex justify-content-center">
              <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
              {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={nextPage}
                disabled={currentPage === Math.ceil(products.length / productsPerPage)}
              />
            </Pagination>
          </>
        )}
        {selectedProduct && (
          <UpdateProduct
            product={selectedProduct}
            show={showUpdateProductModal}
            handleClose={() => {
              setShowUpdateProductModal(false);
              setSelectedProduct(null);
            }}
            handleUpdateProduct={handleUpdateProduct}
          />
        )}
        <AddNewProduct
          show={showAddProductModal}
          handleClose={() => setShowAddProductModal(false)}
          handleAddProduct={handleAddProduct}
          shopId={shop.shopId}
        />
        <ConfirmModal
          show={showConfirmModal}
          handleClose={() => setShowConfirmModal(false)}
          handleConfirm={confirmDeleteProduct}
          message="Are you sure you want to delete this product?"
        />
      </Container>
    </Container>
  );
};

export default ManageShop;
