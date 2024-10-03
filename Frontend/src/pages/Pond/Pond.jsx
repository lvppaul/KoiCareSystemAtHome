import AddNewPond from '../../components/AddNewPond'
import './Pond.css'
import { Card } from 'react-bootstrap';
import managepond from '../../assets/images/managepond.png'
function Pond() {
  return (
    <>
    <div className='pond-list-header'>
    <h1>Pond List</h1>
    <AddNewPond />
    </div>
    <div className='pond-container'>
        <Card md={4} className='pond-card'>
            <Card.Body>
                <Card.Img variant="header" src={managepond} />
            </Card.Body>
            <Card.Body>
                    <h5>Pond in front of house</h5>
            </Card.Body>
        </Card>
        <Card md={4} className='pond-card'>
            <Card.Body>
                <Card.Img variant="header" src={managepond} />
            </Card.Body>
            <Card.Body>
                    <h5>Pond in front of house</h5>
            </Card.Body>
        </Card>
        <Card md={4} className='pond-card'>
            <Card.Body>
                <Card.Img variant="header" src={managepond} />
            </Card.Body>
            <Card.Body>
                    <h5>Pond in front of house</h5>
            </Card.Body>
        </Card>
        
    </div>
    </>
  )
}

export default Pond