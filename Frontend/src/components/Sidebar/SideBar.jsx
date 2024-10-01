import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './SideBar.css';
import { Button, Nav, NavbarBrand } from 'react-bootstrap';
import logo from "../../assets/logo.svg";
function SideBar() {
    return (
        <>
            <Sidebar>
                <Menu>
                    <div className='brand'>
                <NavbarBrand>
                    <img src={logo} alt='logo'/> 
                    <span className="brand-name">FPT TT Koi</span>
                </NavbarBrand>
                    </div>
                    <div className='menu'>
                        
                    <MenuItem>
                        <Link to="/">Report</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/usermanage">Customer</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/">Shop</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/">Product</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/">Categories</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/">Setting</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link to="/">Feedback</Link>
                    </MenuItem>
                    <MenuItem>
                        <Button>Log out</Button>
                    </MenuItem>
                    </div>
                </Menu>
            </Sidebar>
        </>
    )
}
export default SideBar;