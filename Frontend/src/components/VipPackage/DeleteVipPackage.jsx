import { BiTrash } from 'react-icons/bi'
import { showConfirmAlert } from '../ConfirmAlert/ConfirmAlert';
import { deleteVipPackage } from '../../Config/VipPackageApi';
import Button from 'react-bootstrap/Button';
import { ToastContext } from "../../App";
import { useContext } from 'react';

const DeleteVipPackage = ({vipPack, updateDeleteVipPack}) => {
    const id = vipPack.vipId;
  const { setToastMessage } = useContext(ToastContext);
    const handleDelete = async () => {
        const confirm = await showConfirmAlert('Delete Vip Package', 'Are you sure you want to delete this Vip Package?');
        if (confirm) {
            const response = await deleteVipPackage(id);
            if (response.status === 204) {
              await updateDeleteVipPack();
              // setToastMessage('Vip Package deleted successful!');
            } else {
                setToastMessage("Failed to delete Vip Package!");
                // console.error('Failed to delete Vip Package!');
            }
        }
        else {
            return;
        }
      };
    

    return (
    <>
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