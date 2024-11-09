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
        const response = await api.get(`KoiRemind/GetKoiRemindListByUserId`, { params: { userId } });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const getKoiRemindByKoiId = async (koiId) => {
    try {
        const response = await api.get(`/KoiRemind/`, { params: { koiId } });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const createKoiRemind = async (koiRemind) => {
    try {
        const response = await api.post('/KoiRemind', koiRemind);
        console.log('response:', response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};

const deleteKoiRemind = async (koiRemindId) => {
    try {
        const response = await api.delete(`/KoiRemind/${koiRemindId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
};



export { getKoiRemind, getKoiRemindByUserId, createKoiRemind, deleteKoiRemind, getKoiRemindByKoiId };
    