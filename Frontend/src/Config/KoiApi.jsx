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

// Function to get all male Koi in all ponds
const getKoiMaleInAllPond = async (userId) => {
    try {
        const response = await api.get('Koi/GetKoiMaleInAllPond', {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting male Koi in all ponds:', error);
        throw error;
    }
};


// Function to get all female Koi in all ponds
const getKoiFemaleInAllPond = async (userId) => {
    try {
        const response = await api.get(`Koi/GetKoiFemaleInAllPond`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting female Koi in all ponds:', error);
        throw error;
    }
};

// Function to get all Koi by user ID
const getAllKoiByUserId = async (userId) => {
    try {
        const response = await api.get(`Koi/GetAllKoiByUserId`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting all Koi by user ID:', error);
        throw error;
    }
};

// Function to get all alive Koi in all ponds
const getKoiAliveInAllPond = async (userId) => {
    try {
        const response = await api.get(`Koi/GetKoiAliveInAllPond`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting alive Koi in all ponds:', error);
        throw error;
    }
};

// Function to get all dead Koi in all ponds
const getKoiDeadInAllPond = async (userId) => {
    try {
        const response = await api.get(`Koi/GetKoiDeadInAllPond`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting dead Koi in all ponds:', error);
        throw error;
    }
};

// Function to get all dead male Koi in all ponds
const getKoiMaleDeadInAllPond = async (userId) => {
    try {
        const response = await api.get(`Koi/GetKoiMaleDeadInAllPond`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting dead male Koi in all ponds:', error);
        throw error;
    }
};

// Function to get all dead female Koi in all ponds
const getKoiFemaleDeadInAllPond = async (userId) => {
    try {
        const response = await api.get(`Koi/GetKoiFemaleDeadInAllPond`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting dead female Koi in all ponds:', error);
        throw error;
    }
};

// Function to get all alive male Koi in all ponds
const getKoiMaleAliveInAllPond = async (userId) => {
    try {
        const response = await api.get(`Koi/GetKoiMaleAliveInAllPond`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting alive male Koi in all ponds:', error);
        throw error;
    }
};

// Function to get all alive female Koi in all ponds
const getKoiFemaleAliveInAllPond = async (userId) => {
    try {
        const response = await api.get(`Koi/GetKoiFemaleAliveInAllPond`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting alive female Koi in all ponds:', error);
        throw error;
    }
};

// Function to get all alive female Koi in a specific pond
const getKoiFemaleAliveInPond = async (pondId, userId) => {
    try {
        const response = await api.get(`Koi/GetKoiFemaleAliveInPond/${pondId}`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting alive female Koi in pond:', error);
        throw error;
    }
};

// Function to get all Male Alive Koi in a specific pond
const getKoiMaleAliveInPond = async (pondId, userId) => {
    try {
        const response = await api.get(`Koi/GetKoiMaleAliveInPond/${pondId}`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting alive koi');
        throw error;
    }
}

// Function to get all Koi Female Dead in a specific pond 
const getKoiFemaleDeadInPond = async (pondId, userId) => {
    try {
        const response = await api.get(`Koi/GetKoiFemaleDeadInPond/${pondId}`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting koi female dead in pond');
        throw error;
    }
}

const getKoiMaleDeadInPond = async (pondId, userId) => {
    try {
        const response = await api.get(`Koi/GetKoiMaleDeadInPond/${pondId}`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Error getting koi male dead in pond');
        throw error;
    }
}


export { getKoiByUserId, getKoiById, postKoi, deleteKoi, updateKoi, getKoiListByUserId
    , addRecord, deleteRecord, updateKoiRecord, getKoiRecord, getKoiMaleInAllPond, getKoiFemaleInAllPond, getAllKoiByUserId, getKoiAliveInAllPond, getKoiDeadInAllPond, getKoiMaleDeadInAllPond, getKoiFemaleDeadInAllPond, getKoiMaleAliveInAllPond, getKoiFemaleAliveInAllPond, getKoiFemaleAliveInPond, getKoiMaleAliveInPond, getKoiFemaleDeadInPond, getKoiMaleDeadInPond, getKoiWithThumbnail
 };