import api from './AxiosConfig';

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

// Function to get category by ID
const getCategoryById = async (categoryId) => {
    try {
        const response = await api.get(`Category/GetCategoryById/${categoryId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching categories with ID ${categoryId}:`, error);
        throw error;
    }
};
//Add Category function
const addCategories = async (category) => {
    try {
        const response = await api.post('Category', category);
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

const deleteCategories = async (categoryId) => {
    try {
        const response = await api.delete(`Category/${categoryId}`);
        return response;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
}

export { getCategories, getCategoryById, addCategories, deleteCategories };