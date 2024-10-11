import React from 'react';
import './AdminNav.css'; // Make sure to create and style this CSS file
import { Navbar } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import { NavDropdown } from 'react-bootstrap';

const AdminNav = () => {
    // const auth = useAuth();
  // if (!auth) {
  //   console.error("auth not available");
  //   return null;
  // }
  // const { user, logout } = auth;
  // const handleLogOut = () => {
  //   logout();
  // }
    return (
        <Navbar className="admin-nav">
            <div className="admin-nav__search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="admin-nav__user">
            <NavDropdown title={<BiUserCircle size={50} />} id="basic-nav-dropdown">    
                {/* {user ? (
                  <NavDropdown.Item onClick={handleLogOut}>
                    Log out
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item as={NavLink} to="/login">
                    Log in
                  </NavDropdown.Item>
                )} */}
            </NavDropdown>
            </div>
        </Navbar>
    );
};

export default AdminNav;