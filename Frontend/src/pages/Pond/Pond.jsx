import AddNewPond from '../../components/AddNewPond'
import './Pond.css'
import { Card} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/AxiosConfig';


const Pond = () => {
    const navigate = useNavigate();
    const navigateToPondDetails = (pondId) => {
        navigate("/pondDetail");
    }

    useEffect(() => {
        fetchPondInfo();
    }, []);
    const[ponds, setPonds] = useState([]);
    const fetchPondInfo = async () => {
        try {
            const response = await api.get("pond");
            setPonds(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    
    const[showModalAddPond, setShowModalAddPond] = useState(false);

  return (
    <>
    <div className='pond-list-header'>
    <h1>Pond List</h1>
    <AddNewPond 
    show={showModalAddPond} 
    setShow={setShowModalAddPond}/>
            <Card md={4} className='pond-card' onClick={() => navigateToPondDetails()}>
                <Card.Body>
                    <Card.Img variant="header" src= "../../assets/images/shop.png" />
                </Card.Body>
                <Card.Body>
                    <h5>sample</h5>
                </Card.Body>
            </Card>
    </div>
    </>
  )
}

export default Pond