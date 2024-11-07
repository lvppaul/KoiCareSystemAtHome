import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  ListGroup,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/AuthProvider";
import {
  getCartByUserId,
  addItemToCart,
  removeItemFromCart,
} from "../../Config/CartApi";
import { createOrder } from "../../Config/OrderApi"; // Add this import
import { getAccountByUserId } from "../../Config/UserApi"; // Add this import
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Config/firebase";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { user } = useAuth();
  const userId = user?.userId;

  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const fetchCart = useCallback(async () => {
    try {
      const response = await getCartByUserId(userId);
      const items = response.cartItems;
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          if (item.thumbnail) {
            try {
              const storageRef = ref(storage, item.thumbnail);
              const productThumbnail = await getDownloadURL(storageRef);
              return {
                ...item,
                thumbnail: productThumbnail,
                quantity: item.quantity || 1,
              };
            } catch (error) {
              console.error(
                "The file does not exist in firebase anymore!",
                error
              );
              const storageRef = ref(storage, "others/NotFound.jpg");
              const productThumbnail = await getDownloadURL(storageRef);
              return {
                ...item,
                thumbnail: productThumbnail,
                quantity: item.quantity || 1,
              };
            }
          }
        })
      );

      setCartItems(updatedItems);
      setCart(response);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleQuantityChange = async (productId, e) => {
    const newQuantity = parseInt(e.target.value);
    const currentItem = cartItems.find((item) => item.productId === productId);
    const oldQuantity = currentItem.quantity;

    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId) {
        item.quantity = newQuantity;
        item.totalPrice = item.price * newQuantity;
      }
      return item;
    });
    setCartItems(updatedCartItems);

    if (newQuantity > oldQuantity) {
      await addItemToCart(userId, {
        productId,
        quantity: newQuantity - oldQuantity,
      });
      console.log("Item added from cart:", cartItems);
    } else if (newQuantity < oldQuantity) {
      await removeItemFromCart(userId, {
        productId,
        quantity: oldQuantity - newQuantity,
      });
      console.log("Item removed from cart:", cartItems);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  const handleRemoveItem = async (cartItem) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== cartItem.productId
    );
    setCartItems(updatedCartItems);
    await removeItemFromCart(userId, {
      productId: cartItem.productId,
      quantity: cartItem.quantity,
    });
  };

  const handleCreateOrder = async () => {
    try {
      const userDetails = await getAccountByUserId(userId);
      const orderData = {
        userId: userId,
        fullName: userDetails.firstName + " " + userDetails.lastName,
        phone: userDetails.phoneNumber,
        email: userDetails.email,
        street: userDetails.street,
        district: userDetails.district,
        city: userDetails.city,
        country: userDetails.country,
        orderDetails: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      
      const response = await createOrder(orderData);
      console.log(response);
      if (response.orderId) {
        navigate(`/order/${response.orderId}`);
      } else {
        console.error("Error creating order:", response);
        setErrorMessages(
          "Please fill your information in the profile page before proceeding to checkout"
        );
      }
    } catch (error) {
      console.error("Error creating order:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  return (
    <Container>
      <Container className="cart-container p-3">
        <Row>
          <Col md={8}>
            <Container>
              <Row>
                <div
                  className="cart-title mb-3"
                  style={{
                    fontWeight: "bolder",
                    fontSize: "32px",
                    backgroundColor: "lightgray",
                  }}
                >
                  Your Cart
                </div>
              </Row>
              <ListGroup variant="flush">
                {cartItems.map((cartItem) => (
                  <ListGroup.Item key={cartItem.productId} className="cart-item" style={{ marginBottom: "10px" }}>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Link to={`/product/${cartItem.productId}`}>
                          <Image src={cartItem.thumbnail} alt={cartItem.productName} fluid rounded />
                        </Link>
                      </Col>
                      <Col md={4} className="d-flex flex-column align-items-start">
                        <Link
                          to={`/product/${cartItem.productId}`}
                          className="cart-item-name"
                          style={{
                            fontWeight: "bold",
                            fontSize: "1.2rem",
                            color: "black",
                            textDecoration: "none",
                          }}
                        >
                          {cartItem.productName}
                        </Link>
                        <p style={{ fontWeight: "bold", color: "gray" }}>Price: {cartItem.price} ₫</p>
                      </Col>
                      <Col md={2}>
                        <Form.Label style={{ fontWeight: "bold" }}>Quantity:</Form.Label>
                        <Form.Control
                          as="select"
                          value={cartItem.quantity}
                          onChange={(e) => handleQuantityChange(cartItem.productId, e)}
                          className="text-center"
                          style={{ width: "60px" }}
                        >
                          {[...Array(12).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>

                      <Col md={4} className="d-flex flex-column justify-content-end align-items-end">
                        <p
                          style={{
                            fontWeight: "bolder",
                            fontSize: "1.1rem",
                            color: "#E47E39",
                          }}
                        >
                          Total: {cartItem.totalPrice} ₫
                        </p>
                        <Button type="button" variant="danger" onClick={() => handleRemoveItem(cartItem)}>
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Container>
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.length} items): {calculateTotalAmount()} ₫
                </h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={handleCreateOrder}
                >
                  Proceed to Checkout
                </Button>
                {errorMessages && <p className="error-message mt-3">{errorMessages}</p>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Cart;
