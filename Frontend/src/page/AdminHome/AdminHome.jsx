import React from 'react'
import SideBar from '../../components/Sidebar/SideBar'
import { Col, Row } from 'react-bootstrap'
function AdminHome() {
  return (
    <>  
    <Row>
        <Col>
            <SideBar/>
        </Col>
        <Col>
            <h1>Admin Home</h1>
            <div>
                
            </div>
        </Col>
    </Row>
    </>
  )
}

export default AdminHome