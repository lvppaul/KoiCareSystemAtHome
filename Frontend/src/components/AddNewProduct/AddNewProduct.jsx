import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { useAuth } from "../../pages/Login/AuthProvider";
import { getCategories } from "../../Config/CategoryApi";
import { FaChevronDown } from "react-icons/fa";

const AddNewProduct = ({ shopId, show, handleClose, handleAddProduct }) => {
  const initProduct = {
    name: "",
    description: "",
    expiredDate: null,
    quantity: 0,
    price: 0,
    status: "In Stock",
    categoryId: "",
    shopId: shopId,
    thumbnail: "others/NotFound.jpg",
  };
  const [newProduct, setNewProduct] = useState(initProduct);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailRef, setThumbnailRef] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const { user } = useAuth();
  const userId = user?.userId;

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      const storageRef = ref(storage, `product/productThumbnails/${userId}/${Date.now()}_${file.name}`);
      try {
        setThumbnailFile(file);
        setThumbnailRef(storageRef);
        setPreviewThumbnail(previewUrl);
        setNewProduct({ ...newProduct, thumbnail: storageRef.fullPath });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files).filter((file) => file && file.type.startsWith("image/"));
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    try {
      setImageFiles(files);
      setPreviewImages(previewUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if(newProduct.categoryId !== "2" && (!newProduct.expiredDate || newProduct.expiredDate < new Date().toISOString().split("T")[0])) {
      setError("Expired date must be greater than today");
      return;

    }

    try { 
      if (thumbnailFile) {
        await uploadBytes(thumbnailRef, thumbnailFile);
      }

      handleAddProduct(newProduct, imageFiles);
      setNewProduct(initProduct);
      setPreviewThumbnail("");
      setThumbnailFile(null);
      setThumbnailRef(null);
      setPreviewImages([]);
      setImageFiles([]);
      handleClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductThumbnail" className="mb-3">
            <Form.Label>Product Thumbnail</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleThumbnailChange} />
            {previewThumbnail && (
              <img src={previewThumbnail} alt="Product Thumbnail" style={{ width: "100px", margin: "5px" }} />
            )}
          </Form.Group>
          <Form.Group controlId="formProductName" className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductExpiredDate" className="mb-3">
            <Form.Label>Expiration Date</Form.Label>
            <Form.Control
              type="date"
              name="expiredDate"
              value={newProduct.expiredDate}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </Form.Group>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Form.Group controlId="formProductDescription" className="mb-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductQuantity" className="mb-3">
            <Form.Label>Product Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product quantity"
              name="quantity"
              value={newProduct.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductPrice" className="mb-3">
            <Form.Label>Product Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter product price"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formProductCategoryId" className="position-relative mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="categoryId" value={newProduct.categoryId} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
            <FaChevronDown
              style={{
                position: "absolute",
                right: "1rem",
                top: "80%",
                transform: "translateY(-80%)",
                pointerEvents: "none",
              }}
            />
          </Form.Group>
          <Form.Group controlId="formProductImages" className="mb-3">
            <Form.Label>Product Images</Form.Label>
            <Form.Control type="file" accept="image/*" multiple onChange={handleImagesChange} />
            {previewImages.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Product Image: ${index + 1}`}
                style={{ width: "100px", margin: "5px" }}
              />
            ))}
          </Form.Group>
          <Button variant="primary" type="submit">
            Add Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNewProduct;
