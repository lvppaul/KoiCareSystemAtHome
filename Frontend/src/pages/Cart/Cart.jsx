import { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { storage } from "../../Config/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const getCartItems = async () => {
  const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        const updatedCart = await Promise.all(parsedCart.map(async (item) => {
            if (item.thumbnail) {
            const storageRef = ref(storage, item.thumbnail);
            item.thumbnail = await getDownloadURL(storageRef);
            }
            return item;
        }));
        return updatedCart;
    } else {
        return [];
    }
};

// Function to save cart items to localStorage
const saveCartItems = (items) => {
  localStorage.setItem("cartItems", JSON.stringify(items));
};
const Cart = () => {
    const [cartItems, setCartItems] = useState(() => {
    const items = getCartItems();
    return Array.isArray(items) ? items : [];
});

  useEffect(() => {
    saveCartItems(cartItems);
  }, [cartItems]);

  const updateQuantity = (id, quantity) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedItems);
  };

  const removeFromCart = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <Card className="text-center">
          <Card.Body>
            <Card.Text>Your cart is empty</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <Card>
          <Card.Body>
            {cartItems.map((item) => (
              <Row key={item.id} className="align-items-center mb-3">
                <Col xs={2}>
                    <img
                        src={item.thumbnail}
                        alt={item.name}
                        fluid
                        rounded
                    />
                </Col>
                <Col>
                  <h5>{item.name}</h5>
                  <p>${item.price}</p>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="light" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <BiMinus />
                  </Button>
                  <span className="mx-2">{item.quantity}</span>
                  <Button variant="light" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <BiPlus />
                  </Button>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    <BiTrash />
                  </Button>
                </Col>
              </Row>
            ))}
            <Row className="mt-4">
              <Col className="text-end">
                <h5>Total: ${total.toFixed(2)}</h5>
                <Button variant="primary" className="w-100">
                  Proceed to Checkout
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Cart;