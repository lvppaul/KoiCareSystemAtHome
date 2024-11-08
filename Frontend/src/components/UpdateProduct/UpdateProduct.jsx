import React, { useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { getCategories } from "../../Config/CategoryApi";
import { useAuth } from "../../pages/Login/AuthProvider";
import { deleteProductImage, getProductImagesByProductId } from "../../Config/ProductApi";
import { FaChevronDown } from "react-icons/fa";

const UpdateProduct = ({ product, show, handleClose, handleUpdateProduct }) => {
  const [newProduct, setNewProduct] = useState({
    ...product,
    categoryId: product.category.categoryId,
  });
  const [previewThumbnail, setPreviewThumbnail] = useState(product.thumbnail);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const { user } = useAuth();
  const userId = user.userId;

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
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setNewProduct({ ...newProduct, [name]: newValue });
  };

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      const storageRef = ref(storage, `product/productThumbnails/${userId}/${Date.now()}_${file.name}`);
      try {
        const notFound = await getDownloadURL(ref(storage, "others/NotFound.jpg"));
        if (
          newProduct.thumbnail &&
          newProduct.thumbnail !== notFound &&
          newProduct.thumbnail !== "Others/NotFound.jpg"
        ) {
          const oldThumbnailRef = ref(storage, newProduct.thumbnail);
          try {
            await uploadBytes(storageRef, file);
            await deleteObject(oldThumbnailRef);
          } catch (error) {
            console.error("Error deleting old thumbnail:", error);
          }
        }
        setThumbnailFile(file);
        setPreviewThumbnail(previewUrl);
        setNewProduct({ ...newProduct, thumbnail: storageRef.fullPath });
      } catch (error) {
        console.error("Error uploading thumbnail:", error);
        throw error;
      }
    }
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files).filter((file) => file && file.type.startsWith("image/"));
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    try {
      const productImages = await getProductImagesByProductId(newProduct.productId);
      if (productImages && productImages.length > 0) {
        await Promise.all(
          productImages.map(async (productImage) => {
            const imageRef = ref(storage, productImage.imageUrl);
            console.log("Deleting image:", productImage.imageId);
            await deleteProductImage(productImage.imageId);
            try {
              await deleteObject(imageRef);
            } catch (error) {
              console.error("Error deleting product image:", error);
            }
          })
        );
      }
      setImageFiles(files);
      setPreviewImages(previewUrls);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (thumbnailFile) {
        const storageRef = ref(storage, newProduct.thumbnail);
        await uploadBytes(storageRef, thumbnailFile);
      }

      handleUpdateProduct(newProduct, imageFiles);
      setNewProduct(newProduct);
      setPreviewThumbnail(newProduct.thumbnail);
      setThumbnailFile(null);
      setPreviewImages([]);
      setImageFiles([]);
      handleClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Product</Modal.Title>
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
          <Form.Group controlId="formProductStatus" className="mb-3">
            <Form.Check
              type="checkbox"
              label="Product Status"
              name="status"
              checked={newProduct.status}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formProductCategoryId" className="position-relative mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="categoryId" onChange={handleChange} required>
              <option value={newProduct.categoryId}>Select Category</option>
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
            Update Product
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProduct;
