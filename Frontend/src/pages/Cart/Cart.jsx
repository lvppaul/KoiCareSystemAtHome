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

const Cart = () => {
  const { user } = useAuth();
  const userId = user.userId;

  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = useCallback(async () => {
    try {
      const response = await getCartByUserId(userId);
      const items = response.cartItems;
      const updatedItems = await Promise.all(
        items.map(async (item) => {
          const storageRef = ref(storage, item.thumbnail);
          const productThumbnail = await getDownloadURL(storageRef);
          return { ...item, thumbnail: productThumbnail };
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

  const handleQuantityChange = async (productId, newQuantity) => {
    const currentItem = cartItems.find((item) => item.productId === productId);
    const oldQuantity = currentItem.quantity;

    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === productId) {
        item.quantity = newQuantity;
      }
      return item;
    });
    setCartItems(updatedCartItems);

    if (newQuantity > oldQuantity) {
      await addItemToCart(userId, {
        productId,
        quantity: newQuantity - oldQuantity,
      });
    } else if (newQuantity < oldQuantity) {
      await removeItemFromCart(userId, {
        productId,
        quantity: oldQuantity - newQuantity,
      });
    }
  };

  const handleRemoveItem = async (productId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedCartItems);
    await removeItemFromCart(userId, { productId, quantity: 0 });
  };

  const handleCreateOrder = async () => {
    try {
      const userDetails = await getAccountByUserId(userId);
      const orderData = {
        userId: userId,
        fullName: userDetails.firstName + " " + userDetails.lastName,
        phone: userDetails.phone,
        email: userDetails.email,
        street: userDetails.street,
        district: userDetails.district,
        city: userDetails.city,
        country: userDetails.country,
        orderStatus: "Pending",
        orderDetails: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      const response = await createOrder(orderData);
      console.log("Order created successfully:", response);
      // Handle successful order creation (e.g., redirect to order confirmation page)
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const totalAmount = cart.totalAmount;

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
                  <ListGroup.Item
                    key={cartItem.productId}
                    className="cart-item"
                  >
                    <Row className="align-items-center">
                      <Col md={2}>
                        <Image
                          src={cartItem.thumbnail}
                          alt={cartItem.productName}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link
                          to={`/product/${cartItem.productId}`}
                          className="cart-item-name"
                        >
                          {cartItem.productName}
                        </Link>
                      </Col>
                      <Col md={2}>${cartItem.price}</Col>
                      <Col md={3}>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.productId,
                                cartItem.quantity - 1
                              )
                            }
                          >
                            -
                          </Button>
                          <Form.Control
                            type="number"
                            value={cartItem.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                cartItem.productId,
                                parseInt(e.target.value)
                              )
                            }
                            className="cart-item-quantity mx-2"
                            min="1"
                            style={{ width: "60px", textAlign: "center" }}
                          />
                          <Button
                            variant="secondary"
                            onClick={() =>
                              handleQuantityChange(
                                cartItem.productId,
                                cartItem.quantity + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>${cartItem.totalPrice}</Col>
                      <Col md={1}>
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => handleRemoveItem(cartItem.productId)}
                        >
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
                  Subtotal ({cartItems.length} items): ${totalAmount}
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
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Cart;
