import { Navbar, Nav, Container, Form, FormControl, NavDropdown } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/logo.svg";
import "./Navigationbar.css";
import { BiUserCircle, BiCart } from "react-icons/bi";
import { useAuth } from "../../pages/Login/AuthProvider"; // Correct import for useAuth

const Navigationbar = () => {
  const auth = useAuth();
  if (!auth) {
    console.error("auth not available");
    return null;
  }
  const { user, logout } = auth;
  const handleLogOut = () => {
    logout();
  }

  return (
    <>
      <header className="header d-flex justify-content-end w-100">
        <NavLink to="/contact" className="mx-2 text-white text-decoration-none">
          Contact Us
        </NavLink>
        <NavLink to="/about" className="mx-2 text-white text-decoration-none">
          About Us
        </NavLink>
        {/* {user && (
          <NavDropdown title={<BiUserCircle size={24} />} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
            <NavDropdown.Item>Role: {user.role}</NavDropdown.Item>
          </NavDropdown>
        )} */}
      </header>
      <Navbar expand="lg" bg="light">
        <Container fluid>
          <Nav className="flex-grow-4">
            <NavLink to="/" className="navbar-brand d-flex align-items-center">
              <img src={Logo} alt="Logo" className="navbar-logo" />
            </NavLink>
          </Nav>
          <Nav className="flex-grow-4 mx-auto">
            <NavLink className="nav-title" to="/">
              Home
            </NavLink>
            <NavLink className="nav-title" to="/shop">
              Shop
            </NavLink>
            <NavLink className="nav-title" to="/news">
              News
            </NavLink>
            <NavLink className="nav-title" to="/blogs">
              Blogs
            </NavLink>
            <NavDropdown
              title="Koi Pond"
              id="basic-nav-dropdown"
              className="custom-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/pond">
                Pond
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/foodcalculator">
                Food Calculator
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/saltcalculator">
                Salt Calculator
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="flex-grow-4 ms-auto nav-right">
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search..."
                className="me-2 rounded-pill"
              />
            </Form>
            <NavDropdown title={<BiUserCircle size={50} />} id="basic-nav-dropdown">    
                {user ? (
                  <>
                  <NavDropdown.Item onClick={handleLogOut}>
                    Log out
                  </NavDropdown.Item>
                  <hr />
                  <NavDropdown.Item style={{fontWeight: 'bold', color: 'black'}} disabled>
                    Role: {user.role} <br />
                    Email: {user.email}
                  </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item as={NavLink} to="/login">
                    Log in
                  </NavDropdown.Item>
                  
                )}
            </NavDropdown>
            <NavLink href="#cart">
              {" "}
              <BiCart size={50} color="Black" style={{marginTop: '5px'}}/>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
