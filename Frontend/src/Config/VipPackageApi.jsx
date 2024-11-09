import api from "./AxiosConfig";

const getVipPackages = async () => {
  try {
    const response = await api.get("VipPackage");
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return error.response.message;
  }
};
const getVipPackagesById = async (id) => {
  try {
    const response = await api.get(`VipPackage/GetVipPackageById/${id}`);
    console.log("getby id", response);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return error.response.message;
  }
};

const addVipPackage = async (data) => {
  try {
    const response = await api.post(`VipPackage`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return error.response;
  }
};

const updateVipPackage = async (id, dataUpdate) => {
  try {
    const response = await api.put(`VipPackage/${id}`, dataUpdate);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return error.response;
  }
};

const deleteVipPackage = async (id) => {
  try {
    const response = await api.delete(`VipPackage/${id}`);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return error.response;
  }
};

const orderVipPackage = async (data) => {
  try {
    const response = await api.post(`Order/CreateOrderVip`, data);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    return error.response;
  }
};

const getVipPackageByOrderId = async (id) => {
  try {
    const response = await api.get(`VipPackage/GetVipPackageByOrderId`, {
      params: {
        orderId: id,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    return error.response;
  }
};

const getVipPackageName = async (vipId) => {
  try {
    const response = await api.get(`VipPackage/GetVipPackageById/${vipId}`);
    return response.data.name;
  } catch (error) {
    console.error("Error fetching vip name:", error);
    return null;
  }
};

export {
  getVipPackages,
  getVipPackagesById,
  addVipPackage,
  updateVipPackage,
  deleteVipPackage,
  orderVipPackage,
  getVipPackageByOrderId,
  getVipPackageName,
};
