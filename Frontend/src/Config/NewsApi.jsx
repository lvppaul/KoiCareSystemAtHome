import api from './AxiosConfig';

// Function to get news
const getAllNews = async () => {
    try {
        const response = await api.get('News', {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

// Function to get a new by new ID
const getNewsById = async (newsId) => {
    try {
        const response = await api.get(`News/async/${newsId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
}

// Function to add a new new
const addNews = async (data) => {
    try {
        const response = await api.post('News', data, {
            headers: {
                'accept': 'text/plain'
            }
        });
        console.log('response:', response);
        return response.data;
    } catch (error) {
        console.error('Error adding new:', error);
        throw error;
    }
};

// Function to add a new new
const addNewsImages = async ({ newsId, imageUrl }) => {
    try {
        const response = await api.post('NewsImage', { newsId, imageUrl }, {
            headers: {
                'accept': 'text/plain'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding new image:', error);
        throw error;
    }
}


export { getAllNews, getNewsById, addNews, addNewsImages };