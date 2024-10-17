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
// Function to get shop by user ID
const getShopByUserId = async (userId) => {
    try {
        const response = await api.get(`Shop/UserId/${userId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching shop with userId ${userId}:`, error);
        throw error;
    }
};

// Function to update a product
const updateShopDetails = async (data) => {
    try {
        const response = await api.put(`Shop/${data.shopId}`, data, {
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

export { getShop, getShopByUserId, updateShopDetails };