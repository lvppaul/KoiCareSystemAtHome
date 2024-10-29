import React, { useState, useEffect, useCallback } from "react";
import { Container, Row, Col, Button, Image, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../Login/AuthProvider";
import { getCartByUserId } from "../../Config/CartApi";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../Config/firebase";

const Cart = () => {
  const { user } = useAuth();
  const userId = user.userId;

  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = useCallback( async () => {
    try {
      const response = await getCartByUserId(userId);
      const items = response.cartItems;
      const updatedItems = await Promise.all(items.map(async (item) => {
        const storageRef = ref(storage, item.thumbnail);
        const productThumbnail = await getDownloadURL(storageRef);
        return {...item, thumbnail: productThumbnail};
      }));

      setCartItems(updatedItems);
      setCart(response);
      
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  console.log(cart);
  console.log(cartItems);

  return (
    <Container>
      <Container className="cart-container p-3">
        <Row>
          <Col md={8}>
            <Container>
              <Row>
                <div className="cart-title mb-3" style={{fontWeight: 'bolder', fontSize: '32px', backgroundColor: 'lightgray'}}>Your Cart</div>
              </Row>
              <ListGroup variant="flush">
                {cartItems.map((cartItem) => (
                  <ListGroup.Item key={cartItem.productId} className="cart-item">
                    <Row>
                      <Col md={2}>
                        <Image src={cartItem.thumbnail} alt={cartItem.productName} fluid rounded />
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
                      <Col md={2}>
                        <input
                          type="number"
                          value={cartItem.quantity}
                          onChange
                          className="cart-item-quantity"
                        />
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => (cartItem.id)}
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
                  Subtotal 
                 
                  items
                </h2>
             
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                 
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
