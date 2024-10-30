import api from "./AxiosConfig";

const sendPayment = async (data) => {
    try {
        const response = await api.post("VNPay/create-payment", data, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error sending payment:", error);
        return null;
    }
}

const getVNPayResult = async (returnUrl) => {
    try {
        const response = await api.post("VNPay/vnpay-return", returnUrl, {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting payment result:", error);
        return null;
    }
}

export { sendPayment, getVNPayResult };