import React from 'react'
import { Modal } from 'react-bootstrap'

const CreateNewReminded = ({show, setShow, koiList}) => {
  return (
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Create New Reminder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group">
                    <label htmlFor="koiId">Koi Name</label>
                    <select className="form-control" id="koiId">
                        {koiList.map((koi) => (
                            <option key={koi.koiId} value={koi.koiId}>{koi.name}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="dateRemind">Date</label>
                    <input type="date" className="form-control" id="dateRemind" />
                </div>
                <div className="form-group">
                    <label htmlFor="remindDescription">Description</label>
                    <textarea className="form-control" id="remindDescription" rows="3"></textarea>
                </div>
            </form>
        </Modal.Body>
    </Modal>
  )
}

export default CreateNewReminded