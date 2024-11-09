import api from './AxiosConfig';

const getKoiRemind = async () => {
    try {
        const response = await api.get('/KoiRemind');
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { getKoiRemind };
    