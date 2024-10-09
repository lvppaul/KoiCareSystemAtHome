
  import SideBar from '../../../components/Sidebar/SideBar'
  import TableUser from '../../../components/TableUser/TableUser'
  import { Row, Col, Container } from 'react-bootstrap'
  import AdminNav from '../../../components/AdminNav/AdminNav'
  import { Outlet } from 'react-router-dom'

  const AdminHome = () => {
    return (
      <Container fluid style={{ minHeight: '100vh', backgroundColor: '#FCEFCF', padding: '12px 0' }}>
      <Row>
        <Col md={2}>
          <SideBar />
        </Col>
        <Col md={10}>
          <Row>
            <AdminNav />
          </Row>
          <div className='main-container-admin'>
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
    )
  }

  export default AdminHome
