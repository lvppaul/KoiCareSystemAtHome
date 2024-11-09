import React from 'react'
import { Modal, Card } from 'react-bootstrap'
import KoiNameFromId from './KoiNameFromId'

const KoiReminderList = ({show, setShow, koiReminders}) => {
    const formatDate = (date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }
    koiReminders.sort((a, b) => new Date(b.dateRemind) - new Date(a.dateRemind))
  return (
    <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Koi Reminders</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {koiReminders.map((koiRemind) => (
                <Card key={koiRemind.remindId} className="mb-2">
                    <Card.Body>
                        <Card.Title><KoiNameFromId koiId={koiRemind.koiId}/> - {formatDate(koiRemind.dateRemind)}</Card.Title>
                        <Card.Text style={{fontSize:'20px'}}>{koiRemind.remindDescription}</Card.Text>
                    </Card.Body>
                </Card>
            ))}

        </Modal.Body>
    </Modal>
  )
}

export default KoiReminderList