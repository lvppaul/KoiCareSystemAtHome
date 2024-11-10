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
        return response;
    } catch (error) {
        if (error.response) {
            console.log("error.response:", error.response.status);
            return error.response;
        } else {
            console.error("Error getting VNPay result:", error);
            return { status: 500, data: "Unknown error occurred" };
        }
    }
};

const getPDF = async (orderId) => {
    try {
        const response = await api.post(`PDF`, null, {
            params: {
                orderId: orderId,
            },
            responseType: 'arraybuffer'
        });
        console.log('response:', response);
        return response;
    } catch (error) {
        if (error.response) {
            console.log("error.response:", error.response.status);
            return error.response;
        } else {
            console.error("Error getting PDF:", error);
            return { status: 500, data: "Unknown error occurred" };
        }
    }
};


export { sendPayment, getVNPayResult, getPDF };