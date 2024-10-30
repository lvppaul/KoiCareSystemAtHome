import api from './AxiosConfig';

const getCart = async () => {
    try {
        const response = await api.get('/cart');
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
}

const addToCart = async (data) => {
    try {
        const response = await api.post('/cart', data);
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
}

export { getCart, addToCart };