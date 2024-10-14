import axios from 'axios';

const baseUrl = 'https://localhost:7062/api/';

const config = {
    baseURL: baseUrl
};
const api = axios.create(config);

const handleBefore = (config) => {
    
    console.log('Making API call to:', config.url);
    
    return config;
};
api.interceptors.request.use(handleBefore, error => Promise.reject(error));

export default api ;
