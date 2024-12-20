import api from './AxiosConfig';
const getWaterParameter = async (pondId) => {
    try {
        const response = await api.get(`WaterParameter/WaterParameterByPondId/${pondId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching water parameter:', error);
        throw error;
    }       
}

const addWaterParameter = async (waterData) =>{
    try{
        const response = await api.post(`WaterParameter`, waterData);
        console.log('response', response.data)
        return response.data;
    } catch (error){
        console.log('error', error)
    }
}

const deleteWaterData = async (measureId) => {
    try{
        const response = await api.delete(`WaterParameter/${measureId}`);
        return response;
    } catch (error){
        console.log('error', error)
    }
}

const checkWaterParameter = async (waterData) => {
    try{
        const response = await api.post(`WaterParameter/CheckWaterParameter`, waterData);
        return response.data;
    } catch (error){
        console.log('error', error)
    }
}

const getWaterParameterAdvice = async (waterData) => {
    try{
        const response = await api.post(`WaterParameter/WaterParameterAdvice`, waterData);
        return response.data;
    } catch (error){
        console.log('error', error)
    }
}


export {getWaterParameter, addWaterParameter, deleteWaterData, checkWaterParameter, getWaterParameterAdvice};