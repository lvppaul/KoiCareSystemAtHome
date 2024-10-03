import React from 'react';
import './AdminNav.css'; // Make sure to create and style this CSS file
import { Navbar } from 'react-bootstrap';
const AdminNav = () => {
    return (
        <Navbar className="admin-nav">
            <div className="admin-nav__search">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="admin-nav__user">
                <span>User</span>
            </div>
        </Navbar>
    );
};

export default AdminNav;