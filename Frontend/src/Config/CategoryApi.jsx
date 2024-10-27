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

export { getCategories, getCategoryById };