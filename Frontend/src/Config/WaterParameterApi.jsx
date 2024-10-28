import api from './AxiosConfig';
const getWaterParameter = async (pondId) => {
    try {
        const response = await api.get(`Pond/ListWaterParameter/${pondId}`);
        console.log('Water parameter fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching water parameter:', error);
        throw error;
    }
}
export {getWaterParameter};