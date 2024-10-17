import api from './AxiosConfig';

// Function to get products
const getProducts = async () => {
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

// Function to add a new product
const addProduct = async (data) => {
    try {
        const response = await api.post('Product', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product:', error);
        throw error;
    }
};

// Function to update a product
const updateProduct = async (data) => {
    try {
        const response = await api.put(`Product/${data.productId}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error);
        throw error;
    }
};

// Function to delete a product
const deleteProduct = async (productId) => {
    try {
        await api.delete(`Product/${productId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
    } catch (error) {
        console.error('Error deleting product:', error);
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

const getProductByUserId = async (userId) => {
    try {
        const response = await api.get(`Product/UserId/${userId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products with userId ${userId}:`, error);
        throw error;
    }
};

const getProductImageByProductId = async (productId) => {
    try {
        const response = await api.get(`ProductImage/ProductId/${productId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching product image with productId ${productId}:`, error);
        throw error;
    }
}

export {
    getProducts, addProduct, updateProduct, deleteProduct,
    getProductById, getProductByUserId, getProductImageByProductId
};