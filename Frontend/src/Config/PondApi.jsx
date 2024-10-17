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
            const ponds = pondList.data;
            const pondsWithThumbnails = await Promise.all(ponds.map(async (pond) => {
                if (pond.thumbnail) {
                    try {
                        const storageRef = ref(storage, pond.thumbnail);
                        const thumbnailUrl = await getDownloadURL(storageRef);
                        return { ...pond, thumbnailUrl };
                    } catch (error) {
                        console.error('Error fetching thumbnail:', error);
                        return { ...pond, thumbnailUrl: null };
                    }
                } else {
                    return { ...pond, thumbnailUrl: null };
                }
            }));
            return pondsWithThumbnails;
        }
    } catch (error) {
        console.error('Error fetching ponds:', error);
        throw error;
    }
}

const getPondsById = async (pondId) => {
    try {
        const response = await api.get(`Pond/async/${pondId}`, {
            headers: {
                'accept': 'text/plain'
            }
        });

        const pond = response.data;

        if (pond && pond.thumbnail) {
            try {
                const storageRef = ref(storage, pond.thumbnail);
                const thumbnailUrl = await getDownloadURL(storageRef);
                pond.thumbnail = thumbnailUrl; // Set the thumbnail URL back to the pond object
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
        const response = await api.post('Pond', pondData);
        return response;
    } catch (error) {
        console.error('Error posting pond data:', error);
        return;
        ;}
};

export { getPonds, getPondByUserId , getPondsById, postPond};