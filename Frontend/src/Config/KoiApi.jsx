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

const deleteKoi = async (koiId) => {
    try {
        await api.delete(`Koi/${koiId}`);
    } catch (error) {
        console.error('Error deleting koi:', error);
        throw error;
    }
}



export { getKoiByUserId, getKoiById, postKoi, deleteKoi, updateKoi };