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

const getPondByUserId = async (userId) => {
    try {
        const allPond = await getPonds();
        const pond = allPond.filter(pond => pond.userId === userId);
        if(!pond){
            console.log('Pond not found');
            return null;
        } else {
            return pond;
        }
    } catch (error) {
        console.error('Error fetching ponds:', error);
        throw error;
    }
}

const getPondsById = async (pondId) => {
    try {
        const response = await api.get(`Pond/async/${pondId}`, {
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
const postPond = async (userId, data) => {
    try {
        const response = await api.post(`Pond/`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting pond data:', error);
        //throw error;
    }
};

export { getPonds, getPondsById ,postPond, getPondByUserId };