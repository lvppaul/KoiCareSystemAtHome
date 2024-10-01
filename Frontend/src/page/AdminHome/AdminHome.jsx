import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import { Col, Row } from 'react-bootstrap'
import TableUser from '../../components/TableUser/TableUser'
function AdminHome() {
  return (
    <>
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10}>
          <h1>Admin Home</h1>
          <div>
            <TableUser />
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AdminHome