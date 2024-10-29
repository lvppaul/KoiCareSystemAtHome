import api from './AxiosConfig';

// Function to get carts
const getCarts = async () => {
    try {
        const response = await api.get('Cart', {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching carts:', error);
        throw error;
    }
};

// Function to create cart
const createCart = async (userId) => {
    try {
        const response = await api.post('Cart', userId, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating cart:', error);
        throw error;
    }
}

// Function to get cart by userId
const getCartByUserId = async (userId) => {
    try {
        const response = await api.get(`Cart/UserId/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting cart by userId:', error);
        return null;
    }
}

// Function to add item to cart
const addItemToCart = async (userId, item) => {
    try {
        const response = await api.post(`Cart/AddItem`, item, {
            params: {
                userId: userId
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        throw error;
    }
}

// Function to remove item from cart
const removeItemFromCart = async (userId, item) => {
    try {
        const response = await api.post(`Cart/RemoveItem`, item, {
            params: {
                userId: userId
            },
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
}


// Function to update item in cart
const updateItemInCart = async (userId, item) => {
    try {
        const response = await api.post(`Cart/UpdateItem`, item, {
            params: {
                userId: userId
            },
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating item in cart:', error);
        throw error;
    }
}

export { createCart, getCarts, getCartByUserId, addItemToCart, removeItemFromCart, updateItemInCart };