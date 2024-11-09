import { BiTrash } from 'react-icons/bi'
import { useContext, useState } from 'react'
import { showConfirmAlert } from '../ConfirmAlert/ConfirmAlert'
import { deleteKoiRemind } from '../../Config/KoiRemind';
import { Button } from 'react-bootstrap';
import { ToastContext } from '../../App';

const DeleteKoiRemind = ({remindId, updateKoiRemind}) => {
    const {setToastMessage} = useContext(ToastContext);
    
    const handleDeleteRemind = async () => {  
            try{
                const result = await showConfirmAlert('Delete Remind', `Are you sure you want to delete this koi's remind?`);
                if(result){
                    await deleteKoiRemind(remindId);
                    await updateKoiRemind(remindId);
                    await setToastMessage('Delete remind successful');
                }
            } catch (error) {
                console.error('Error deleting Koi remind:', error);
                await setToastMessage('Delete remind failed');
            }
        }

    return (
        <Button onClick={handleDeleteRemind} 
            style={{display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '1rem',
                backgroundColor:'red'}}>
            <BiTrash size={30} color='white'/>
        </Button>
    )
}

export default DeleteKoiRemind;