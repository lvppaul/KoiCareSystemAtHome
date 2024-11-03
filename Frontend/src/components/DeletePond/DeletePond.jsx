import { Button } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { deletePond } from '../../Config/PondApi';
import { storage } from '../../Config/firebase';
import { ref, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { showConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

const DeletePond = ({ pondData, koiInPond, onPondDelete }) => {
    const pondId = pondData.pondId;
    const notFound = 'others/NotFound.jpg';
    const pondThumbnail = pondData.thumbnail;
    const [alert, setAlert] = useState(false);

    const handleDelete = async () => {
        if (koiInPond.length > 0) {
            setAlert(true);
            return;
        } else {
            
            const confirmDelete = await showConfirmAlert('Delete Pond', 'Are you sure you want to delete this pond?');
            if (!confirmDelete) {
                return;
            }
            console.log('Deleting pond:', pondData);
            if (pondThumbnail) {
                const imageRef = ref(storage, pondThumbnail);
                try {
                    if (imageRef.fullPath === notFound || imageRef.fullPath === '') {
                        deletePond(pondId);
                        onPondDelete(pondId);
                    } else {
                        deleteObject(imageRef)
                        .then(() => {
                            console.log("Image deleted successfully");
                            deletePond(pondId);
                            onPondDelete(pondId);
                        });
                    }
                } catch (error) {
                    console.error('Error deleting thumbnail:', error);
                }
            }
        }
    };

    return (
        <>
            {alert && 
            <Alert 
            style={{ position: 'absolute', zIndex: '1000', right: '10px', top: '10px' }} 
            severity="error"
            onClose={() => setAlert(false)}
            >
                Please remove all koi fish from the pond before deleting!</Alert>}
            
            <Button 
                onClick={handleDelete}
                style={{ 
                    width: '180px', 
                    height: '50px', 
                    fontWeight: 'bold', 
                    fontSize: '18px', 
                    borderRadius: '15px', 
                    backgroundColor: '#F94050',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FF8433'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#F94050'}
            >
                <MdDelete size={25} />
                Delete Pond
            </Button>
        </>
    );
};

export default DeletePond;