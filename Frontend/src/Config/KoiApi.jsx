import api from './AxiosConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

// Function to get kois
const getKoiByUserId = async (userId) => {
    try {
        const response = await api.get('Koi', {
            headers: {
                'accept': 'text/plain'

            }
        });
        const kois = response.data;
        const koiByUserId = kois.filter(koi => koi.userId === userId);
        const koiWithThumbnail = getKoiWithThumbnail(koiByUserId);
        return koiWithThumbnail;

    } catch (error) {
        console.error('Error fetching kois:', error);
        throw error;
    }
}

// Function to get kois by userId
const getKoiListByUserId = async (koiId) => {
    try {
        const response = await api.get(`Koi/${koiId}`, {
            headers: {
                'accept': 'text/plain'

            }
        });
        console.log('response', response)
        return response.data;
    } catch (error) {
        console.error('Error fetching kois:', error);
        throw error;
    }
}

//Get Koi by userId 
const getKoiWithThumbnail= async (koiList) => {
    const notFound = 'others/NotFound.jpg';
    try {
        if(koiList)
        {
            const koiWithThumbnail = await Promise.all(koiList.map(async (koi) => {
                const storageRef = ref(storage, koi.thumbnail);
                try {
                    koi.thumbnail = await getDownloadURL(storageRef);
                } catch (error) {
                    console.error(`Error fetching thumbnail for koi ${koi.koiId}:`, error);
                    const notFoundStorageRef = ref(storage, notFound);
                    koi.thumbnail = await getDownloadURL(notFoundStorageRef);
                }
                return koi;
            }));
            return koiWithThumbnail;
        }
    } catch (error) {
        console.error('Error fetching thumbnail for koi:', error);
        throw error;
    }
}

// Function to get Koi by ID
const getKoiById = async (koiId) => {
    const notFound = 'others/NotFound.jpg';
    try {
        const response = await api.get(`Koi/GetKoiById/${koiId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        const koi = response.data;
        if (koi) {
            try{
                const storageRef = ref(storage, koi.thumbnail);
                try {
                    koi.thumbnail = await getDownloadURL(storageRef);
                } catch (error) {
                    const notFoundStorageRef = ref(storage, notFound);
                    koi.thumbnail = await getDownloadURL(notFoundStorageRef);
                }
                return koi;
            } catch (error) {
                console.error('Error fetching thumbnail:', error);
                koi.thumbnail = null;
                return koi;
            }
        } else {
            koi.thumbnail = null;
            return koi;
        }
    } catch (error) {
        console.error(`Error fetching koi with ID ${koiId}:`, error);
        throw error;
    }
};

// Function to post Koi
const postKoi = async (koi) => {
    try {
        const response = await api.post('Koi', koi);
        return response.data;
    } catch (error) {
        console.error('Error posting koi:', error);
        throw error;
    }
};

// Function to update Koi
const updateKoi = async (koi) => {
    try {
        const response = await api.put(`Koi/${koi.koiId}`, koi);
        return response.data;
    } catch (error) {
        console.error('Error updating koi:', error);
        throw error;
    }
};

// Function to delete Koi
const deleteKoi = async (koiId) => {
    try {
        await api.delete(`Koi/${koiId}`);
    } catch (error) {
        console.error('Error deleting koi:', error);
        throw error;
    }
}

// Function to get Koi Record
const getKoiRecord = async (recordId) => {
    try {
        const response = await api.get(`KoiRecord/async/${recordId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching growth history:', error);
        throw error;
    }
}

// Function to add Koi Record
const addRecord = async (record) => {
    try {
        const response = await api.post('KoiRecord', record);
        return response.data;
    } catch (error) {
        console.error('Error posting growth history:', error);
        throw error;
    }
};

// Function to delete Koi Record
const deleteRecord = async (recordId) => {
    console.log('recordId', recordId)
    try {
        const respone = await api.delete(`KoiRecord/${recordId}`);
        return respone;
    } catch (error) {
        console.error('Error deleting growth history:', error);
        throw error;
    }
};

// Function to update Koi Record
const updateKoiRecord = async (record) => {
    try {
        const response = await api.put(`KoiRecord/${record.recordId}`, record);
        return response.data;
    } catch (error) {
        console.error('Error updating growth history:', error);
        throw error;
    }
}

export { getKoiByUserId, getKoiById, postKoi, deleteKoi, updateKoi, getKoiListByUserId
    , addRecord, deleteRecord, updateKoiRecord, getKoiRecord
 };