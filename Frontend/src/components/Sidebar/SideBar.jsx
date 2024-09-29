import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './SideBar.css';

function SideBar() {
    return (
        <>
            <Sidebar>
                <Menu>
                    <SubMenu label="Charts">
                        <MenuItem>
                            <Link to="/usermanage">User Manager</Link>
                        </MenuItem>
                        <MenuItem> Line charts </MenuItem>
                    </SubMenu>
                    <MenuItem> Documentation </MenuItem>
                    <MenuItem> Calendar </MenuItem>
                </Menu>
            </Sidebar>;
        </>
    )
}
export default SideBar;