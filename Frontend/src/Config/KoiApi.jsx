import api from './AxiosConfig';

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
const postKoi = async (koi) => {
    try {
        const response = await api.post('Koi', koi);
        return response.data;
    } catch (error) {
        console.error('Error posting koi:', error);
        throw error;
    }
};

const updateKoi = async (koi) => {
    try {
        const response = await api.put(`Koi/${koi.koiId}`, koi);
        return response.data;
    } catch (error) {
        console.error('Error updating koi:', error);
        throw error;
    }
};

export { getKois, getKoiById, postKoi };