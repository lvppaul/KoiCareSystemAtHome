import api from "./AxiosConfig";

// Lock User:
const lockUser = async (userId) => {
  try {
    const response = await api.put(`Account/LockoutEnable/${userId}`, {
      headers: {
        accept: "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching lock user:", error);
    return null;
  }
};

// UnLock User:
const unLockUser = async (userId) => {
  try {
    const response = await api.put(`Account/LockoutDisable/${userId}`, {
      headers: {
        accept: "text/plain",
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error fetching unlock user:", error);
    return null;
  }
};

// Get Vips
const getVips = async () => {
  try {
    const response = await api.get("Account/GetVips", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vips:", error);
    return null;
  }
};
// total Shops
const getTotalVips = async () => {
  try {
    const response = await api.get("Account/GetTotalVips", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching total vips:", error);
    return null;
  }
};

// total Shops
const getTotalShops = async () => {
  try {
    const response = await api.get("Account/GetTotalShops", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching total shops:", error);
    return null;
  }
};

// total Members
const getTotalMembers = async () => {
  try {
    const response = await api.get("Account/GetTotalMembers", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching total members:", error);
    return null;
  }
};
// Get shops
const getShops = async () => {
  try {
    const response = await api.get("Account/GetShops", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    return null;
  }
};

// Get members
const getMembers = async () => {
  try {
    const response = await api.get("Account/GetMembers", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching members:", error);
    return null;
  }
};
// Function to get account by userId
const getAccountByUserId = async (userId) => {
  try {
    const response = await api.get(`Account/GetAccountByUserId/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting account by userId:", error);
    return null;
  }
};

// Function to get user ID by email
const getUserIdByEmail = async (email) => {
  try {
    const response = await api.get(
      `Account/GetUserIdByEmail/${encodeURIComponent(email)}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting user ID by email:", error);
    return null;
  }
};

// Function to delete account
const deleteAccount = async (userId) => {
  try {
    const response = await api.put(`Account/DeleteAccount/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error deleting account:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else {
      return { error: "Unknown error occurred" };
    }
  }
};

// Function to update account
const updateAccount = async (userId, account) => {
  try {
    const response = await api.put(
      `Account/UpdateAccountDetail${userId}`,
      account,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error updating account:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      return error.response.data;
    } else {
      return { error: "Unknown error occurred" };
    }
  }
};

export {
  getAccountByUserId,
  getUserIdByEmail,
  deleteAccount,
  updateAccount,
  getMembers,
  getVips,
  getTotalMembers,
  getTotalVips,
  getShops,
  getTotalShops,
  lockUser,
  unLockUser,
};
