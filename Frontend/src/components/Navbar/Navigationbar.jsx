import React from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import 'react-icons/';
import Logo from "../../assets/logo.svg";
import "./Navigationbar.css";

function Navigationbar() {
  return (
    <>
      <header className="header d-flex justify-content-end w-100">
        <NavLink to="/contact" className="mx-2 text-white text-decoration-none">
          Contact Us
        </NavLink>
        <NavLink to="/about" className="mx-2 text-white text-decoration-none">
          About Us
        </NavLink>
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
            <NavLink href="#profile" to="/login">
              <i className="bi bi-person-circle nav-icon"></i>
            </NavLink>
            <NavLink href="#cart">
              {" "}
              <i className="bi bi-bag nav-icon"></i>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigationbar;
