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
        const allShop = await api.get('Shop', {
            headers: {
                'accept': 'text/plain'
            }
        });
        const allShopData = allShop.data;
        const shop = allShopData.find(shop => shop.userId === userId);
        if (!shop) {
            throw new Error('Shop not found for the given user ID');
        }
        const response = await api.get(`Shop/${shop.shopId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching shop by user ID:', error);
        throw error;
    }
};

// Function to update a product
const updateShopDetails = async (data) => {
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

export { getShop, getShopByUserId, updateShopDetails };