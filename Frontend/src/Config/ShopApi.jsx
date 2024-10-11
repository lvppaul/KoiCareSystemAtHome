import api from './AxiosConfig';

// Function to get kois
const getShop = async () => {
    try {
        const response = await api.get('Shop', {
            headers: {
                'accept': 'text/plain'

            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching shops:', error);
        throw error;
    }
}

// Function to update a product
const updateShop = async (data) => {
    try {
        const response = await api.put(`Shop/${data.id}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating shop:', error);
        throw error;
    }
};

export { getShop, updateShop };