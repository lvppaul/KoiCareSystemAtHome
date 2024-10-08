import axios from 'axios';

const baseUrl = 'https://localhost:7044/api/';

const config = {
    baseURL: baseUrl
};
const api = axios.create(config);

// Handle before call API
const handleBefore = (config) => {
    // Add any logic before making an API call
    console.log('Making API call to:', config.url);
    //handle before call api
    return config;
};

// Attach the handleBefore function to the api instance
api.interceptors.request.use(handleBefore, error => Promise.reject(error));

// Function to get user info
const getUserInfo = async (token) => {
    try {
        const response = await api.get('user', {
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
        const response = await api.get('Product', {
            headers: {
                'accept': 'text/plain'

            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

// Function to get ponds
const getPonds = async () => {
    try {
        const response = await api.get('Pond', {
            headers: {
                'accept': 'text/plain'

            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching ponds:', error);
        throw error;
    }
}

// Function to get kois
const getKois = async () => {
    try {
        const response = await api.get('Koi', {
            headers: {
                'accept': 'text/plain'

            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching kois:', error);
        throw error;
    }
}

// Function to get product by ID
const getKoiById = async (koiId) => {
    try {
        const response = await api.get(`Koi/${koiId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching koi with ID ${koiId}:`, error);
        throw error;
    }
};

// Function to post pond data
const postPond = async (token, data) => {
    try {
        const response = await axios.post(`${baseUrl}/Pond/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting pond data:', error);
        throw error;
    }
};

// Function to get categories
const getCategories = async () => {
    try {
        const response = await api.get('Category', {
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
        const response = await api.get(`Product/${productId}`, {
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
export { getUserInfo, getShopProducts, getPonds, getKois, getKoiById, getCategories, getProductById };
