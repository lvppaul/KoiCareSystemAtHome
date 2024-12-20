import { BiTrash } from 'react-icons/bi';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteKoi } from '../../Config/KoiApi';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { showConfirmAlert } from '../ConfirmAlert/ConfirmAlert';

const DeleteKoi = ({ koiData, handleKoiDelete }) => {
    const koiId = koiData.koiId;
    const notFound = 'others/NotFound.jpg';
    const koiThumbnail = koiData.thumbnail;
    const handleDelete = async () => {
        const confirm = await showConfirmAlert('Delete Koi', 'Are you sure you want to delete this koi fish?')
        // Call the onDelete function passed as a prop
        if (confirm) {
            if (koiThumbnail) {
                const imageRef = ref(storage, koiThumbnail);
                try {
                    if (imageRef.fullPath === notFound) {
                        deleteKoi(koiId);
                        handleKoiDelete(koiId);
                    } else {
                        deleteObject(imageRef)
                            .then(() => {
                                console.log("Image deleted successfully");
                                deleteKoi(koiId)
                                handleKoiDelete(koiId);
                            })
                    }
                } catch (error) {
                    console.error('Error deleting thumbnail:', error);
                }
            }
        } else {
            return;
        }
    }
    return (
        <>
            <Button
                onClick={handleDelete}
                style={{
                    width: '120px',
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
                <BiTrash size={20} /> Delete
            </Button>
        </>
    )
}

export default DeleteKoi