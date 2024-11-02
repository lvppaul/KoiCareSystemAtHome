import { BiTrash } from 'react-icons/bi'
import { showConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { deleteVipPackage } from '../../Config/VipPackageApi';
import Button from 'react-bootstrap/Button';
import {ToastifyMessage} from '../Toastify/ToastifyModel';
import { useState } from 'react';

const DeleteVipPackage = ({vipPack, updateDeleteVipPack}) => {
    const id = vipPack.vipId;
    const [toastMessages, setToastMessages] = useState([]);
    const handleDelete = async () => {
        const confirm = await showConfirmAlert('Delete Vip Package', 'Are you sure you want to delete this Vip Package?');
        if (confirm) {
            const response = await deleteVipPackage(id);
            if (response.status === 204) {
                await updateDeleteVipPack();
                // setToastMessages((prev) => [...(prev), 'Vip Package deleted successful!']);
            } else {
                setToastMessages((prev) => [...(prev), 'Failed to delete Vip Package!']);
                // console.error('Failed to delete Vip Package!');
            }
        }
        else {
            return;
        }
      };
    

    return (
    <>
        {/* <ToastifyMessage messages={toastMessages} onClose={(index) => {
            setToastMessages((prev) => prev.filter((_, i) => i !== index));
        }} /> */}
        <Button onClick={handleDelete} style={{backgroundColor:'red'}}
        onMouseEnter={(e) => e.target.style.backgroundColor = 'darkred'}
        onMouseLeave={(e) => e.target.style.backgroundColor = 'red'}>
            <BiTrash size={30} color='white'
            onMouseEnter={(e) => e.target.style.backgroundColor = 'darkred'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'red'}/>
        </Button>
    </>
  )
}

export default DeleteVipPackage