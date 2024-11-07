import api from "./AxiosConfig";

// get total revenue
const getTotalRevenue = async () => {
  try {
    const response = await api.get(`Revenue`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue:", error.response || error.message);
    return null;
  }
};

export { getTotalRevenue };
