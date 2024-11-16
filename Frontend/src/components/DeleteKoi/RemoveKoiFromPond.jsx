import { BiTrash } from 'react-icons/bi';
import { Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '../../Config/firebase';
import { showConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { removeKoiFromPond } from '../../Config/KoiApi';
import { ToastContext } from '../../App';
import { useContext } from 'react';

const RemoveKoiFromPond = ({ koiData, handleKoiDelete }) => {
    const { setToastMessage } = useContext(ToastContext);
    const koiId = koiData.koiId;
    const notFound = 'others/NotFound.jpg';
    const koiThumbnail = koiData.thumbnail;
    const handleDelete = async () => {
        const confirm = await showConfirmAlert('Delete Koi', 'Are you sure you want to remove this Koi out of Pond?')
        // Call the onDelete function passed as a prop
        if (confirm) {
        try {
            const response = await removeKoiFromPond(koiId);
            if(response){
                handleKoiDelete(koiId);
            }
            await setToastMessage('Koi removed from Pond successful! Check Koi list to see this Koi.');
        } catch (error) {
            console.error('Koi remove error', error);
            await setToastMessage('Koi remove from Pond failed!');
        }
            }
    }

    return (
        <>
            <Button
                onClick={handleDelete}
                style={{
                    width: '100px',
                    height: '100px',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    borderRadius: '15px',
                    backgroundColor: '#F94050',
                    transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FF8433'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#F94050'}
            >
                Remove from Pond
            </Button>
        </>
    )

}
export default RemoveKoiFromPond