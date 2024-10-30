import api from './AxiosConfig';

// Function to create an order
const createOrder = async (orderData) => {
    try {
        const response = await api.post('Order', orderData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

export { createOrder };
