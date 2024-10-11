import api from './AxiosConfig';

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


// Function to post pond data
const postPond = async (token, data) => {
    try {
        const response = await api.post(`Pond/`, data, {
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

export { getPonds, postPond };