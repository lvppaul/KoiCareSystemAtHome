import AddNewPond from '../../components/AddNewPond/AddNewPond'
import './Pond.css'
import { Card} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../Config/AxiosConfig';


const Pond = () => {
    const navigate = useNavigate();
    const navigateToPondDetails = (pondId) => {
        navigate("/ponddetail");
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
                <a href="./ponddetail"></a>
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