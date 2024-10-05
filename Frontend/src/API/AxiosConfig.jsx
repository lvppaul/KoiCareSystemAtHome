import axios from 'axios';

const baseUrl = 'https://localhost:7044/api';

const config = {
    baseURL: baseUrl
};
const api = axios.create(config);

// Handle before call API
const handleBefore = (config) => {
    // Add any logic before making an API call
    console.log('Making API call to:', config.url);
    return config;
};

// Attach the handleBefore function to the api instance
api.interceptors.request.use(handleBefore, error => Promise.reject(error));

// Function to get user info
const getUserInfo = async (token) => {
    try {
        const response = await api.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

// Function to get shop products
const getShopProducts = async () => {
    try {
        const response = await api.get('/Product', {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching shop products:', error);
        throw error;
    }
};

// Function to get categories
const getCategories = async () => {
    try {
        const response = await api.get('/Category', {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Function to get product by ID
const getProductById = async (productId) => {
    try {
        const response = await api.get(`/Product/${productId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
    }
};

export default api;
export { getUserInfo, getShopProducts, getCategories, getProductById };
