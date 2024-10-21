import { Button } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";
import { deletePond } from '../../Config/PondApi';
import { storage } from '../../Config/firebase';
import { ref, deleteObject } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
// Removed unused import for Pond

const DeletePond = ({ pondData, koiInPond }) => {
    const pondId = pondData.pondId;
    const notFound = 'others/NotFound.jpg';
    const pondThumbnail = pondData.thumbnail;
    const navigate = useNavigate();
    const handleDelete = () => {
        if (koiInPond.length > 0) {
            alert('Please delete all koi in the pond before deleting the pond');
            return;
        } else {
        // Call the onDelete function passed as a prop
        if (pondThumbnail) {
            const imageRef = ref(storage, pondThumbnail);
            try{
                if(imageRef.fullPath === notFound || imageRef.fullPath === '') {
                    deletePond(pondId);
                    navigate('/pond', { replace: true });
                } else {
                    deleteObject(imageRef)
                    .then(() => {
                        console.log("Image deleted successfully");
                        deletePond(pondId)
                        navigate('/pond', { replace: true });
                    })
                }
            } catch (error) {
                console.error('Error deleting thumbnail:', error);
            }
        }
        }
    }

    return (
        <>
            <Button 
            onClick={handleDelete}
            style={{ 
                width: '180px', 
                height: '70px', 
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