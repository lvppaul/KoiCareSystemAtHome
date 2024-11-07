import api from "./AxiosConfig";

// get list total revenue
const getDataRevenue = async () => {
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

// get the amount of money in current year
const getAmountRevenueCurrentYear = async () => {
  try {
    const response = await api.get(`Revenue/TotalRevenue`, {
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

// get the amount of Vip Package
const getAmountVipPackageCurrentYear = async () => {
  try {
    const response = await api.get(`Revenue/GetTotalVipUpgradeRevenue`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching amount vip package:",
      error.response || error.message
    );
    return null;
  }
};

// get the amount of commission fee
const getAmountCommissionCurrentYear = async () => {
  try {
    const response = await api.get(`Revenue/GetTotalProductRevenue`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching commission:",
      error.response || error.message
    );
    return null;
  }
};

export {
  getDataRevenue,
  getAmountRevenueCurrentYear,
  getAmountVipPackageCurrentYear,
  getAmountCommissionCurrentYear,
};