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

const getKoiRemindByUserId = async (userId) => {
    try {
        const response = await api.get(`/KoiRemind/`, { params: { userId } });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const createKoiRemind = async (koiRemind) => {
    try {
        const response = await api.post('/KoiRemind', koiRemind);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



export { getKoiRemind, getKoiRemindByUserId, createKoiRemind };
    