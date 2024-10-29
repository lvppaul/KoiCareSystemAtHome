import { Button, Modal } from 'react-bootstrap'

const UpdateVipAccount = ({show, setShow, userData}) => {
    const inituserData = { userId: userData.id ,fullName: userData.firstName + " " + userData.lastName, email: userData.email, phone: userData.phoneNumber, street: userData.street, role: userData.role, district: userData.district, city: userData.city, country: userData.country, paymentMethodId:'', orderStatus:'', orderDetails:'', productId:'', quantity:'', }
    const handleClose = () => setShow(false);
  return (
    <>
    <Button
        onClick={setShow}
        variant="primary" className="mt-5">
        Upgrade to VIP Account
    </Button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Upgrade to VIP Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Are you sure you want to upgrade to VIP Account?</p>
            {console.log(inituserData)}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>No</Button>
            <Button variant="primary" onClick={setShow}>Yes</Button>
        </Modal.Footer>
    </Modal>
    </>
  )
}

export default UpdateVipAccount