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
        const response = await api.get(`VNPay/vnpay-return`, {
            params: {
                returnUrl: returnUrl,
            },
            headers: {
                Accept: "application/json",
            },
        });
        console.log("response:", response);
        return response.data;
    } catch (error) {
        console.error("Error getting payment result:", error);
        console.log("error.response:", error.response.data.message);
        return error.response.data.message;
    }
};


export { sendPayment, getVNPayResult };