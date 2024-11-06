import api from "./AxiosConfig";

// Function to create an order
const createOrder = async (orderData) => {
  try {
    const response = await api.post("Order", orderData, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    return error.response;
  }
};

const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`Order/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
};

export { createOrder, getOrderById };

// Get List Vip Package Order.
