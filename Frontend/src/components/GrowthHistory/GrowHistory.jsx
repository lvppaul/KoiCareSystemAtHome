import React from 'react'
import { Card, Button, Modal } from 'react-bootstrap'

const GrowHistory = ({show, setShow, koiData}) => {
  return (
    <>
    <Card as={Button} style={{ padding: '10px', borderRadius: '10px', width:'600px', height:'150px' }} onClick={() => setShow(true)}>
            <p style={{textAlign: 'left'}}>
                <strong>Koi Date</strong>
                <hr/>
              <strong>Length: </strong> koi length (last measure)
              <br />
              <strong>Weight:</strong> koi weight
            </p>
          </Card>
          <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Growth history</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>koidate</p>
              <p>
                Length: koi length (last measure)
                <br />
                Weight: koi weight
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                Close
              </Button>
            </Modal.Footer>
            </Modal>
    </>
  )
}

export default GrowHistory