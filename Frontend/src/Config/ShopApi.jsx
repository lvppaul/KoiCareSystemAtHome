import api from "./AxiosConfig";

// Function to get shop
const getShop = async () => {
  try {
    const response = await api.get("Shop", {
      headers: {
        accept: "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching shops:", error);
    throw error;
  }
};

// Function to get shop by shopId
const getShopByShopId = async (shopId) => {
  try {
    const response = await api.get(`Shop/GetShopByShopId/${shopId}`, {
      headers: {
        accept: "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching shop with shopId ${shopId}:`, error);
    throw error;
  }
};

//Get Shop Name by ShopId
const getShopNameByShopId = async (shopId) => {
  try {
    const response = await api.get(`Shop/GetShopByShopId/${shopId}`);
    const name = response.data.shopName;
    return name;
  } catch (error) {
    console.error(`Error fetching shop name with shopId ${shopId}:`, error);
    throw error;
  }
};

// Function to add a shop
const addShop = async (data) => {
  try {
    const response = await api.post("Shop", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding shop:", error);
    throw error;
  }
};

// Function to get shop by userId
const getShopByUserId = async (userId) => {
  try {
    const response = await api.get(`Shop/UserId/${userId}`, {
      headers: {
        accept: "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching shop with userId ${userId}:`, error);
    throw error;
  }
};

// Function to update a product
const updateShopDetails = async (data) => {
  try {
    const response = await api.put(`Shop/${data.shopId}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating shop:", error);
    throw error;
  }
};

export { getShop, getShopByShopId, addShop, getShopByUserId, updateShopDetails, getShopNameByShopId };
