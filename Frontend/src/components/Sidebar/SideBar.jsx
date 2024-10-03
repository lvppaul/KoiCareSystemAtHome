import { Sidebar, Menu, MenuItem  } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './SideBar.css';
import logo from "../../assets/logo.svg";
import React from 'react';
function SideBar() {
    return (
        <>
        <Sidebar style={{width:'100%'}}>
        <div >
          <div >
            <div style={{backgroundColor: '#FF4900', borderTopRightRadius:'20px', marginBottom:'30px'}}>
                <img src={logo} alt="logo" />
                <span style={{ fontSize: '25px', fontWeight: 'bold' , fontStyle: 'italic'}}>FPT TT Koi</span>
            </div>
            <Menu style={{border:'none'}}>
                <MenuItem component={<Link to="/admin/report" />}> Report</MenuItem>
                <MenuItem component={<Link to="/admin/usermanage" />}> User Manager</MenuItem>
                <MenuItem component={<Link to="/admin/shopadmin" />}> Shop</MenuItem>
                <MenuItem component={<Link to="/admin/products" />}> Product</MenuItem>
                <MenuItem component={<Link to="/admin/catagories" />}> Catagories</MenuItem>
            </Menu>

            <Menu style={{paddingTop: '80px'}}>
              <MenuItem component={<Link to="/admin/setting" />}>
                Setting
              </MenuItem>
              <MenuItem component={<Link to="/admin/feedback" />}>
              Feedback
              </MenuItem>
              <MenuItem onClick={alert}>
                Log out
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
        </>
    )
}
export default SideBar;