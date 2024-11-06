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
        console.log('updated product:', response);
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
        const response = await api.get(`Product/GetProductById/${productId}`, {
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
//get product name by id
const getProductNameById = async (productId) => {
    try {
        const response = await api.get(`Product/GetProductById/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        return response.data.name; // Assuming the response contains a 'name' field
    } catch (error) {
        console.error(`Error fetching product with ID ${productId}:`, error);
        throw error;
    }
};

// Function to get products by shopId
const getProductsByShopId = async (shopId) => {
    try {
        const response = await api.get(`Product/ShopId/${shopId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products with shopId ${shopId}:`, error);
        throw error;
    }
};

// Function to get products by categoryId
const getProductsByCategoryId = async (categoryId) => {
    try {
        const response = await api.get(`Product/GetProductByCategoryId/${categoryId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching products with categoryId ${categoryId}:`, error);
        throw error;
    }
};

// Function to get product image by productId
const getProductImagesByProductId = async (productId) => {
    try {
        const response = await api.get(`Product/GetProductImageByProductId/${productId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching product image with productId ${productId}:`, error);
        throw error;
    }
};

// Function to add product images
const addProductImages = async (data) => {
    try {
        const response = await api.post('ProductImage', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product image:', error);
        throw error;
    }
};

// Function to delete product image
const deleteProductImage = async (imageId) => {
    try {
        await api.delete(`ProductImage/${imageId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
    } catch (error) {
        console.error('Error deleting product image:', error);
        throw error;
    }
};

export {
    getProducts, addProduct, updateProduct, deleteProduct,
    getProductById, getProductsByShopId, getProductsByCategoryId, getProductImagesByProductId,
    addProductImages, deleteProductImage, getProductNameById
};