// import React, { useState, useEffect } from 'react';
// import { Form, Button, Container, Row, Col, Table } from 'react-bootstrap';
// import { getShopProducts, addProduct, updateProduct, deleteProduct, updateShopDetails } from '../../API/AxiosConfig';
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { storage } from '../../firebase';

// const ManageShop = () => {
//   const [products, setProducts] = useState([]);
//   const [shopName, setShopName] = useState('');
//   const [shopImage, setShopImage] = useState('');
//   const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
//   const [editingProduct, setEditingProduct] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const data = await getShopProducts();
//       setProducts(data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const addedProduct = await addProduct(newProduct);
//       setProducts([...products, addedProduct]);
//       setNewProduct({ name: '', price: '', description: '' });
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     try {
//       const updatedProduct = await updateProduct(editingProduct);
//       setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
//       setEditingProduct(null);
//     } catch (error) {
//       console.error('Error updating product:', error);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     try {
//       await deleteProduct(productId);
//       setProducts(products.filter(product => product.id !== productId));
//     } catch (error) {
//       console.error('Error deleting product:', error);
//     }
//   };

//   const handleShopDetailsUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await updateShopDetails({ name: shopName, image: shopImage });
//       alert('Shop details updated successfully');
//     } catch (error) {
//       console.error('Error updating shop details:', error);
//     }
//   };

//   const handleImageUpload = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const storageRef = ref(storage, `shopImages/${file.name}`);
//       try {
//         await uploadBytes(storageRef, file);
//         const imageUrl = await getDownloadURL(storageRef);
//         setShopImage(imageUrl);
//       } catch (error) {
//         console.error('Error uploading image:', error);
//       }
//     };
//   };

//   return (
//     <Container>
//       <h1>Manage Shop</h1>
//       <Form onSubmit={handleShopDetailsUpdate}>
//         <Form.Group controlId="formShopName">
//           <Form.Label>Shop Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter shop name"
//             value={shopName}
//             onChange={(e) => setShopName(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group controlId="formShopImage">
//           <Form.Label>Shop Image</Form.Label>
//           <div>
//             <Button variant="secondary" onClick={handleImageUpload}>Upload Image</Button>
//             {shopImage && <img src={shopImage} alt="Shop" style={{ width: '100px', marginLeft: '10px' }} />}
//           </div>
//         </Form.Group>
//         <Button variant="primary" type="submit">Update Shop Details</Button>
//       </Form>

//       <h2>Products</h2>
//       <Form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
//         <Form.Group controlId="formProductName">
//           <Form.Label>Product Name</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter product name"
//             value={editingProduct ? editingProduct.name : newProduct.name}
//             onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, name: e.target.value }) : setNewProduct({ ...newProduct, name: e.target.value })}
//           />
//         </Form.Group>
//         <Form.Group controlId="formProductPrice">
//           <Form.Label>Product Price</Form.Label>
//           <Form.Control
//             type="number"
//             placeholder="Enter product price"
//             value={editingProduct ? editingProduct.price : newProduct.price}
//             onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, price: e.target.value }) : setNewProduct({ ...newProduct, price: e.target.value })}
//           />
//         </Form.Group>
//         <Form.Group controlId="formProductDescription">
//           <Form.Label>Product Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             placeholder="Enter product description"
//             value={editingProduct ? editingProduct.description : newProduct.description}
//             onChange={(e) => editingProduct ? setEditingProduct({ ...editingProduct, description: e.target.value }) : setNewProduct({ ...newProduct, description: e.target.value })}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">{editingProduct ? 'Update Product' : 'Add Product'}</Button>
//         {editingProduct && <Button variant="secondary" onClick={() => setEditingProduct(null)}>Cancel</Button>}
//       </Form>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.map(product => (
//             <tr key={product.id}>
//               <td>{product.name}</td>
//               <td>{product.price}</td>
//               <td>{product.description}</td>
//               <td>
//                 <Button variant="warning" onClick={() => setEditingProduct(product)}>Edit</Button>
//                 <Button variant="danger" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default ManageShop;