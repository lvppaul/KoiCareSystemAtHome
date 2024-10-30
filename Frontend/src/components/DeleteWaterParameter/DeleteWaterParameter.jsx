import { BiTrash } from 'react-icons/bi'
import { deleteWaterData } from '../../Config/WaterParameterApi'
import { useState } from 'react'

const DeleteWaterParameter = ({waterData, updateDeleteWaterData}) => {
    const [measureId, setMeasureId] = useState(waterData);

    const handleDeleteWaterData = () => {
        if(measureId){
            try{
                const result = window.confirm('Are you sure you want to delete this WaterData?')
                if(result){
                    deleteWaterData(measureId)
                    .then((response) => {
                        console.log('WaterData deleted successfully', response);
                        updateDeleteWaterData(measureId);
                    })
                }
            } catch (error) {
                console.error('Error deleting WaterData:', error);
            }
        }
    }

  return (
    <button onClick={handleDeleteWaterData}
        style={{backgroundColor:'red', borderRadius:'5px', }}>
        <BiTrash size={30} color='white'/>
    </button>
  )
}

export default DeleteWaterParameter;