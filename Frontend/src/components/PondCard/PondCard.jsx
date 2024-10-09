import { Card,Button } from 'react-bootstrap'


const PondCard = ({ pond }) => {
 
  return (
    <Card md={4} className='pond-card'>
        <Card.Body>
            <Card.Img variant="header" src={pond.image} />
        </Card.Body>
        <Card.Body>
                <h5>{pond.name}</h5>
        </Card.Body>
    </Card>
  );
}

export default UserCard