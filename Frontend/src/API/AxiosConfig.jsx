import axios from 'axios';

const baseUrl = 'https://localhost:7044/api/';

const config = {
    baseUrl: baseUrl
};
const api = axios.create(config);

api.defaults.baseURL = baseUrl;


//handle before call api
const handleBefore = (config) => {
    //handle before call api
    return config;
}
   
const getUserInfo = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/user`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
}

const postPond = async (token, data) => {
    try {
        const response = await axios.post(`${baseUrl}/Pond/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error posting pond:', error);
        throw error;
    }
}
;

export default api;
