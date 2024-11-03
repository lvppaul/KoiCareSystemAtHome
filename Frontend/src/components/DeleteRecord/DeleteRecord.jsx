import {useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { deleteRecord } from '../../Config/KoiApi'
import { showConfirmAlert } from '../ConfirmAlert/ConfirmAlert'

const DeleteRecord = ({recordData, updateDeleteRecord}) => {
    const [recordId, setRecordId] = useState(recordData);
    const handleDeleteRecord = () => {
        if(recordId){
            try{
                const result = showConfirmAlert('Delete Record', 'Are you sure you want to delete this record?');
                if(result){
                    deleteRecord(recordId)
                    .then((response) => {
                        console.log('Record deleted successfully', response);
                        updateDeleteRecord(recordId);
                    })
                }
            } catch (error) {
                console.error('Error deleting record:', error);
            }
        }
    }

  return (
    <button onClick={handleDeleteRecord}
        style={{backgroundColor:'red', borderRadius:'5px', }}>
        <BiTrash size={30} color='white'/>
    </button>
  )
}

export default DeleteRecord