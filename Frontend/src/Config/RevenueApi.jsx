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
    const response = await api.get(`Revenue/TotalAdminRevenue`, {
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
    console.error("Error fetching amount vip package:", error.response || error.message);
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
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getShopRevenue = async (shopId) => {
  try {
    const response = await api.get(`Revenue/GetRevenueByShop/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getTotalRevenueByShopFromOrders = async (shopId) => {
  try {
    const response = await api.get(`Revenue/GetTotalRevenueByShopFromOrders/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getTotalRevenueNoCommissionByShopFromOrders = async (shopId) => {
  try {
    const response = await api.get(`Revenue/GetTotalRevenueNoCommissionByShopFromOrders/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getCommissionFeeByShopFromOrders = async (shopId) => {
  try {
    const response = await api.get(`Revenue/GetCommissionFeeByShopFromOrders/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getProductAdminRevenue = async () => {
  try {
    const response = await api.get(`Revenue/GetProductAdminRevenue`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getVipUpgradeRevenue = async () => {
  try {
    const response = await api.get(`Revenue/GetVipUpgradeRevenue`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

/* get total Revenue current month - https://localhost:7062/api/Revenue/TotalAdminRevenueThisMonth */

const getAdminRevenueCurrentMonth = async () => {
  try {
    const response = await api.get(`Revenue/TotalAdminRevenueThisMonth`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

/* get total Vip Package Revenue current month - https://localhost:7062/api/Revenue/GetTotalVipUpgradeRevenueThisMonth */

const getAdminVipPackageRevenueCurrentMonth = async () => {
  try {
    const response = await api.get(`Revenue/GetTotalVipUpgradeRevenueThisMonth`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

/* get total Commission Revenue current month - https://localhost:7062/api/Revenue/GetTotalProductRevenueThisMonth */

const getAdminCommissionRevenueCurrentMonth = async () => {
  try {
    const response = await api.get(`Revenue/GetTotalProductRevenueThisMonth`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getTotalRevenueByShopFromOrdersThisMonth = async (shopId) => {
  try {
    const response = await api.get(`Revenue/GetTotalRevenueByShopFromOrdersThisMonth/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getTotalRevenueNoCommissionByShopFromOrdersThisMonth = async (shopId) => {
  try {
    const response = await api.get(`Revenue/GetTotalRevenueNoCommissionByShopFromOrdersThisMonth/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

const getCommissionFeeByShopFromOrdersThisMonth = async (shopId) => {
  try {
    const response = await api.get(`Revenue/GetCommissionFeeByShopFromOrdersThisMonth/${shopId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching commission:", error.response || error.message);
    return null;
  }
};

export {
  getDataRevenue,
  getAmountRevenueCurrentYear,
  getAmountVipPackageCurrentYear,
  getAmountCommissionCurrentYear,
  getShopRevenue,
  getTotalRevenueByShopFromOrders,
  getTotalRevenueNoCommissionByShopFromOrders,
  getCommissionFeeByShopFromOrders,
  getProductAdminRevenue,
  getVipUpgradeRevenue,
  getAdminRevenueCurrentMonth,
  getAdminVipPackageRevenueCurrentMonth,
  getAdminCommissionRevenueCurrentMonth,
  getTotalRevenueByShopFromOrdersThisMonth,
  getTotalRevenueNoCommissionByShopFromOrdersThisMonth,
  getCommissionFeeByShopFromOrdersThisMonth,
};
