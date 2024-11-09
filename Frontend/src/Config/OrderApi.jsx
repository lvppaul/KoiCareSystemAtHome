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
    const response = await api.get(`Order/OrderId/${orderId}`, {
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

const getOrderByUserId = async (userId) => {
  try {
    const response = await api.get(`Order/UserId/${userId}`, {
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

const getVipOrderByUserId = async (userId) => {
  try {
    const response = await api.get(`Order/VipOrderByUserId/${userId}`, {
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

// get list commission fee order
const getListOrder = async () => {
  try {
    const response = await api.get(`Order`, {
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

// get list Vip package order
const getListVipOrder = async () => {
  try {
    const response = await api.get(`Order/GetVipOrder`, {
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
export {
  createOrder,
  getOrderById,
  getOrderByUserId,
  getVipOrderByUserId,
  getListOrder,
  getListVipOrder,
};
