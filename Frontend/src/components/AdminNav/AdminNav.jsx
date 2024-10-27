import React from 'react';
import './AdminNav.css'; // Make sure to create and style this CSS file
import { Navbar, NavLink } from 'react-bootstrap';
import { BiUserCircle } from 'react-icons/bi';
import { NavDropdown } from 'react-bootstrap';
import { useAuth } from '../../pages/Login/AuthProvider';
const AdminNav = () => {
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
        <Navbar className="admin-nav">
            <div className="admin-nav__search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="admin-nav__user">
            <NavDropdown title={<BiUserCircle size={50} />} id="basic-nav-dropdown" >
            <div
                style={{
                  position: "absolute",
                  left: "-150px", 
                  top: "-15px", 
                  backgroundColor: "white", 
                  zIndex: 100, 
                }}
              >    
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
                ) : null}
            </div>
            </NavDropdown>
            </div>
        </Navbar>
    );
};

export default AdminNav;