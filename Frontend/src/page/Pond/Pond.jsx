import AddNewPond from '../../components/AddNewPond'
import './Pond.css'
import { Card } from 'react-bootstrap';
import managepond from '../../assets/managepond.png'
function Pond() {
  return (
    <>
    <div className='pond-list-header'>
    <h1>Pond List</h1>
    <AddNewPond />
    </div>
    <div className='pond-container'>
        <Card className='col-md-4'>
            <Card.Body>
                <Card.Img variant="top" src={managepond} />
                <Card.Title>Card Title</Card.Title>
            </Card.Body>
        </Card>
        <Card className='col-md-4'>
            <Card.Body>
                <Card.Img variant="top" src={managepond} />
                <Card.Title>Card Title</Card.Title>
            </Card.Body>
        </Card>
        <Card className='col-md-4'>
            <Card.Body>
                <Card.Img variant="top" src={managepond} />
                <Card.Title>Card Title</Card.Title>
            </Card.Body>
        </Card>
    </div>
    </>
  )
}

export default Pond