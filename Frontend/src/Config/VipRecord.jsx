import api from "./AxiosConfig";

// Get Vip Records
const getVipRecords = async () => {
  try {
    const response = await api.get("VipRecord", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching vip records:", error);
    return null;
  }
};

const createVipRecord = async (data) => {
    try {
        const response = await api.post("VipRecord", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating vip record:", error);
        return null;
    }
};

const getVipRecordByUserId = async (id) => {
    try {
        const response = await api.get(`VipRecord/GetVipRecordByUserId/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
        return response;
    } catch (error) {
        console.error("Error fetching vip record by user id:", error);
        return null;
    }
};



export { getVipRecords, createVipRecord, getVipRecordByUserId };
    
