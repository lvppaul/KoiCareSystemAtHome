import api from './AxiosConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../Config/firebase'; // Adjust the import path as needed

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
        const pondList = await api.get(`Pond/GetPondsByUserId/${userId}`);
        if (!pondList.data) {
            console.log('Pond not found');
            return null;
        } else {
            return pondList.data;
        }
    } catch (error) {
        console.error('Error fetching ponds:', error);
        throw error;
    }
}

const getPondsById = async (pondId) => {
    const notFound = 'others/NotFound.jpg';
    try {
        const response = await api.get(`Pond/async/${pondId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });
        const pond = response.data;
        
        if (pond) {
            try {
                const storageRef = ref(storage, pond.thumbnail);
                try {
                    pond.thumbnail = await getDownloadURL(storageRef);
                } catch (error) {
                    const notFoundStorageRef = ref(storage, notFound);
                    pond.thumbnail = await getDownloadURL(notFoundStorageRef);
                }
                return pond;
            } catch (error) {
                console.error('Error fetching thumbnail:', error);
                pond.thumbnail = null; // Set thumbnail to null in case of error
                return pond;
            }
        } else {
            pond.thumbnail = null; // Set thumbnail to null if it doesn't exist
            return pond;
        }
    } catch (error) {
        console.error('Error fetching pond:', error);
        return;
    }
}

// Function to post pond data
const postPond = async (pondData) => {
    try {
        const response = await api.post(`Pond`, pondData);
        console.log('Pond data posted:', response);
        return response;
    } catch (error) {
        console.error('Error posting pond data:', error);
        return;
        ;}
};

const updatePond = async (pondData) => {
    try {
        const response = await api.put(`Pond/${pondData.pondId}`, pondData);
        return response;
    } catch (error) {
        console.error('Error updating pond:', error);
        throw error;
    }
}

const deletePond = async (pondId) => {
    try {
        await api.delete(`Pond/${pondId}`);
    } catch (error) {
        console.error('Error deleting pond:', error);
        throw error;
    }
}

const getKoiInPond = async (pondId) => {
    const notFound = 'others/NotFound.jpg';
    try {
        const response = await api.get(`Pond/ListKoiInPond/${pondId}`);
        const koiStatus = response.data;
        const koiList = koiStatus.filter(koi => koi.status === true);
        if (Array.isArray(koiList)) {
            for (let i = 0; i < koiList.length; i++) {
                if (koiList[i].thumbnail) {
                    const storageRef = ref(storage, koiList[i].thumbnail);
                    try {
                        koiList[i].thumbnail = await getDownloadURL(storageRef);
                    } catch (error) {
                        console.error(`Error fetching thumbnail for pond ${koiList[i].pondId}:`, error);
                        const notFoundStorageRef = ref(storage, notFound);
                        koiList[i].thumbnail = await getDownloadURL(notFoundStorageRef);
                    }
                } else {
                    const notFoundStorageRef = ref(storage, notFound);
                    koiList[i].thumbnail = await getDownloadURL(notFoundStorageRef);
                }
            }
            return koiList;
        } else {
            console.log('Fetched ponds is not array:');
        }
    } catch (error) {
        console.error('Error fetching koi in pond:', error);
        throw error;
    }
}
export { getPonds, getPondByUserId , getPondsById, postPond, updatePond, deletePond, getKoiInPond};